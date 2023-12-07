const text = document.querySelector('.holder');
let content = ['Hope you are Happy Today?', 'Are you Having Fun?', 'Have a Blissful Day', 'Stay Alive', 'Oniduro mi Ese','Make your day blissful'];
var x = 0;
const allPlans = JSON.parse(localStorage.getItem('plans')) || [];
const completed = JSON.parse(localStorage.getItem('completed')) || [];
const ul = document.querySelector('ul');
const err = document.querySelector('.err');
const userplan = document.querySelector('#userplan');
const username = document.querySelector('.name');
const options = document.querySelectorAll('.option');
// const pending = document.querySelector('.pending');
const time = document.querySelector('.moment');
let wrapper = document.querySelector('.greetings');
const inputform = document.querySelector('form');
let currentPage = 'pending';


(function changeText(){
    if(x < content.length){
        x++;
    }else{
        x = 1;
    }
    text.innerHTML = `${content[x-1]}!`;
    setTimeout(changeText,7000);
})();
let date = new Date(),
hour = date.getHours()

if(hour<12){
    time.innerHTML = "Good Morning,";
    wrapper.style.backgroundImage ="url('images/img8.jpg')";
    wrapper.style.backgroundRepeat = "no-repeat";
    wrapper.style.backgroundSize = "cover";
}else if(hour<17){
    time.innerHTML = "Good Afternoon,";
    wrapper.style.backgroundImage = "url('images/11.jpg')";
    wrapper.style.backgroundRepeat = "no-repeat";
    wrapper.style.backgroundSize = "cover";
}else{
    time.innerHTML = "Good Evening,";
    wrapper.style.backgroundImage = "url('images/nat3.jpg')";
    wrapper.style.backgroundRepeat = "no-repeat";
    wrapper.style.backgroundSize = "cover";
    wrapper.style.color = "white";
}


function getname(){
    if(localStorage.getItem('name')===null){
        username.innerHTML = '{Enter Your Name}';
    }else{
        username.innerHTML = localStorage.getItem('name');
    }
}
getname();
options.forEach(option=>{
    option.classList.remove('active')
    option.addEventListener('click',()=>{
        option.classList.add('active')
        if(option.getAttribute('value')=='pending'){
            currentPage = 'pending'
            ul.innerText = ''
            allPlans.length === 0 ? ul.innerHTML='<p>Nothing here yet</p>' :
            allPlans.map(plan=>{
                const newplan = createNewPlan(plan)
                 ul.append(newplan)
            })
        }else if(option.getAttribute('value')=='complete'){
            currentPage = 'completed'
            ul.innerText = ''
            completed.length == 0 ? ul.innerHTML='<p>Nothing here yet</p>':
            completed.map(plan=>{
                const newplan = CompletedPlan(plan)
                 ul.append(newplan)
             })
        }
    })
})
username.addEventListener('keypress',fillname);
username.addEventListener('blur',fillname);
function fillname(e){
    if(e.type === 'keypress'){
        if(e.which==13 || e.keyCode==13){
            localStorage.setItem('name', e.target.innerText);
            username.blur();
        }
    }else{
        localStorage.setItem('name', e.target.innerText);
    }
}
inputform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const planform = {
        id: new Date().getTime(),
        date: new Date().toLocaleString(),
        plan: userplan.value,
    }
    if(userplan.value == '' || userplan.value == undefined){
        err.innerText = `The input field can't be empty`;
        return
    }else{
        err.innerText = '';
        allPlans.push(planform);
        const list = document.createElement('li')
        const div = document.createElement('div')
        const h4 = document.createElement('h4')
        const span = document.createElement('span')
        const radio = document.createElement('input')
        const button = document.createElement('button')
        radio.type = 'checkbox'
        radio.addEventListener('click',()=>{
            alert('The plan would be removed in 5 minutes')
            setTimeout(()=>{
                ul.removeChild(list)
                deletePlan(list)
                updateStorage()
            },300000)
        })
        list.append(radio)
        span.textContent = new Date().toLocaleString() || plan.date;
        h4.textContent = userplan.value || plan.plan;
        div.append(span)
        div.append(h4)
        list.append(div)
        button.textContent = 'Delete'
        button.addEventListener('click',()=>{
            ul.removeChild(list)
            deletePlan(list)
            updateStorage()
        })
        list.append(button)
        if(currentPage=='pending'){
            ul.append(list)
        }
        updateStorage();
    }
    userplan.value = ''
})

window.addEventListener('load',()=>{
    allPlans.map(plan=>{
       const newplan = createNewPlan(plan)
        ul.append(newplan)
    })
})
function updateStorage(){
    localStorage.setItem('plans',JSON.stringify(allPlans));
}

function createNewPlan(item){
    const list = document.createElement('li')
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    const span = document.createElement('span')
    const radio = document.createElement('input')
    const button = document.createElement('button')
    radio.type = 'checkbox';
    radio.addEventListener('click',()=>{
        alert('The plan would be removed in 5 minutes')
        setTimeout(()=>{
            ul.removeChild(list)
            deletePlan(list)
            updateStorage()
        },300000)
    })
    list.append(radio)
    span.textContent = new Date().toLocaleString() || item.date;
    h4.textContent = userplan.value || item.plan;
    div.append(span)
    div.append(h4)
    list.append(div)
    button.textContent = 'Delete'
    button.addEventListener('click',()=>{
        ul.removeChild(list)
        deletePlan(item.id,item.plan)
        updateStorage()
    })
    list.append(button)
    ul.append(list)
    return list
}
function CompletedPlan(item){
    const list = document.createElement('li')
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')
    const span = document.createElement('span')
    span.textContent = `Completed at: ${new Date().toLocaleString() || item.date}`;
    h4.textContent = userplan.value || item.plan;
    p.textContent = 'Completed';
    div.append(span)
    div.append(h4)
    list.append(div)
    list.append(p)
    ul.append(list)
    return list
}

function deletePlan(id,plan){
    const index = allPlans.findIndex(each =>each.id === id)
        if(index !== -1){
            const completeformat = {
                id: new Date().getTime(),
                date: new Date().toLocaleString(),
                plan: plan,
            }
            completed.push(completeformat)
            localStorage.setItem('completed',JSON.stringify(completed));
            allPlans.splice(index,1);
            updateStorage();
        }
}
fillname();
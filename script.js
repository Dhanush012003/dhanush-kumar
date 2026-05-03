/* ============ MOBILE DETECTION ============ */
const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

/* ============ LOADER ============ */
window.addEventListener('load',()=>{
  setTimeout(()=>document.querySelector('.loader').classList.add('hide'),2500);
});

/* ============ FORCE INTERNAL LINKS TO SAME TAB ============ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[data-internal="true"]').forEach(link => {
    link.removeAttribute('target');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if(targetId && targetId.startsWith('#')){
        const targetElement = document.querySelector(targetId);
        if(targetElement){
          targetElement.scrollIntoView({behavior: 'smooth'});
        }
      }
    });
  });
});

/* ============ CURSOR GLOW - DISABLED ON MOBILE ============ */
const cursorGlow=document.querySelector('.cursor-glow');
if(cursorGlow && !isMobile){
  document.addEventListener('mousemove',e=>{
    cursorGlow.style.left=e.clientX+'px';
    cursorGlow.style.top=e.clientY+'px';
  });
}

/* ============ SCROLL PROGRESS - PASSIVE LISTENER ============ */
window.addEventListener('scroll',()=>{
  const scrollTop=window.scrollY;
  const docHeight=document.documentElement.scrollHeight-window.innerHeight;
  const progressBar = document.querySelector('.scroll-progress');
  if(progressBar){
    progressBar.style.width=(scrollTop/docHeight*100)+'%';
  }
},{passive:true});

/* ============ PARTICLES - REDUCED ON MOBILE ============ */
const pCanvas=document.getElementById('particle-canvas');
if(pCanvas && !isMobile){
  const pCtx=pCanvas.getContext('2d');
  pCanvas.width=window.innerWidth;pCanvas.height=window.innerHeight;
  let particles=[];
  const mouse={x:null,y:null,radius:150};
  window.addEventListener('mousemove',e=>{mouse.x=e.x;mouse.y=e.y;});
  window.addEventListener('resize',()=>{pCanvas.width=window.innerWidth;pCanvas.height=window.innerHeight;initParticles();});
  class Particle{
    constructor(){
      this.x=Math.random()*pCanvas.width;this.y=Math.random()*pCanvas.height;
      this.size=Math.random()*2+1;this.baseX=this.x;this.baseY=this.y;
      this.density=Math.random()*30+1;
      this.color=Math.random()>0.5?'#00f0ff':'#ff3cac';
    }
    draw(){
      pCtx.fillStyle=this.color;pCtx.shadowBlur=10;pCtx.shadowColor=this.color;
      pCtx.beginPath();pCtx.arc(this.x,this.y,this.size,0,Math.PI*2);pCtx.fill();
    }
    update(){
      let dx=mouse.x-this.x,dy=mouse.y-this.y;
      let dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<mouse.radius){
        let forceDir=dx/dist,forceDirY=dy/dist;
        let force=(mouse.radius-dist)/mouse.radius;
        let dirX=forceDir*force*this.density,dirY=forceDirY*force*this.density;
        this.x-=dirX;this.y-=dirY;
      }else{
        if(this.x!==this.baseX){this.x-=(this.x-this.baseX)/10;}
        if(this.y!==this.baseY){this.y-=(this.y-this.baseY)/10;}
      }
    }
  }
  function initParticles(){particles=[];for(let i=0;i<100;i++)particles.push(new Particle());}
  function animateParticles(){
    pCtx.clearRect(0,0,pCanvas.width,pCanvas.height);
    particles.forEach(p=>{p.update();p.draw();});
    for(let a=0;a<particles.length;a++){
      for(let b=a;b<particles.length;b++){
        let dx=particles[a].x-particles[b].x,dy=particles[a].y-particles[b].y;
        let d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){
          pCtx.strokeStyle=`rgba(0,240,255,${1-d/100})`;pCtx.lineWidth=0.5;
          pCtx.beginPath();pCtx.moveTo(particles[a].x,particles[a].y);
          pCtx.lineTo(particles[b].x,particles[b].y);pCtx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  initParticles();animateParticles();
}

/* ============ TYPING EFFECT ============ */
const roles=["AI Practitioner 🤖","Data Analyst 📊","Problem Solver 💡","Creative Coder 🎨"];
let roleIdx=0,charIdx=0,isDeleting=false;
const typingEl=document.querySelector('.typing-text');
if(typingEl){
  function type(){
    const current=roles[roleIdx];
    if(isDeleting){
      typingEl.textContent=current.substring(0,charIdx--);
      if(charIdx<0){isDeleting=false;roleIdx=(roleIdx+1)%roles.length;}
    }else{
      typingEl.textContent=current.substring(0,charIdx++);
      if(charIdx>current.length){isDeleting=true;setTimeout(type,1500);return;}
    }
    setTimeout(type,isDeleting?50:120);
  }
  type();
}

/* ============ TERMINAL ============ */
const termCommands=[
  "whoami → Dhanush Kumar S S, AI Practitioner & Data Analyst 🚀",
  "skills → Python, ML, Deep Learning, SQL, Data Viz, NLP, AI Prompting",
  "passion → Building AI that solves real-world problems 🤖",
  "status → Open to opportunities & collaborations ✨",
  "fun_fact → Trains models faster than my coffee brews ☕"
];
const termEl=document.querySelector('.terminal-text');
if(termEl){
  let termIdx=0,termCharIdx=0,termDel=false;
  function termType(){
    const c=termCommands[termIdx];
    if(termDel){
      termEl.textContent=c.substring(0,termCharIdx--);
      if(termCharIdx<0){termDel=false;termIdx=(termIdx+1)%termCommands.length;}
    }else{
      termEl.textContent=c.substring(0,termCharIdx++);
      if(termCharIdx>c.length){termDel=true;setTimeout(termType,2500);return;}
    }
    setTimeout(termType,termDel?30:60);
  }
  setTimeout(termType,3000);
}

/* ============ HAMBURGER ============ */
const hamburger=document.querySelector('.hamburger');
const navLinks=document.querySelector('.nav-links');
if(hamburger && navLinks){
  hamburger.addEventListener('click',()=>navLinks.classList.toggle('active'));
  document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>navLinks.classList.remove('active')));
}

/* ============ MAGNETIC BUTTONS - DISABLED ON MOBILE ============ */
if(!isMobile){
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const rect=btn.getBoundingClientRect();
      const x=e.clientX-rect.left-rect.width/2;
      const y=e.clientY-rect.top-rect.height/2;
      btn.style.transform=`translate(${x*0.3}px,${y*0.3}px)`;
    });
    btn.addEventListener('mouseleave',()=>btn.style.transform='translate(0,0)');
  });
}

/* ============ TILT CARDS - DISABLED ON MOBILE ============ */
if(!isMobile){
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      const x=e.clientX-rect.left,y=e.clientY-rect.top;
      const cx=rect.width/2,cy=rect.height/2;
      const rx=(y-cy)/15,ry=(cx-x)/15;
      card.style.transform=`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='perspective(1000px) rotateX(0) rotateY(0)');
  });
}

/* ============ COUNTERS ============ */
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target;const target=+el.dataset.target;
      let count=0;const speed=target/60;
      const update=()=>{
        count+=speed;
        if(count<target){el.textContent=Math.ceil(count)+'+';requestAnimationFrame(update);}
        else el.textContent=target+'+';
      };
      update();counterObs.unobserve(el);
    }
  });
});
document.querySelectorAll('.counter').forEach(c=>counterObs.observe(c));

/* ============ SKILL BARS ============ */
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.width=e.target.dataset.width;
      skillObs.unobserve(e.target);
    }
  });
});
document.querySelectorAll('.skill-fill').forEach(b=>skillObs.observe(b));

/* ============ GSAP SCROLL ANIMATIONS - SIMPLIFIED ON MOBILE ============ */
if(typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined'){
  gsap.registerPlugin(ScrollTrigger);

  if(isMobile){
    // Simplified animations for mobile - no stagger, shorter duration
    gsap.utils.toArray('section').forEach(sec=>{
      const elements = sec.querySelectorAll('.section-title, .about-card, .skill-card, .project-card, .stat-box, .tl-item, .contact-info, .contact-form, .terminal, .chart-container, .cert-card');
      if(elements.length > 0){
        gsap.from(elements,{
          y:20,duration:0.5,stagger:0.05,
          scrollTrigger:{trigger:sec,start:'top 90%'}
        });
      }
    });
  } else {
    gsap.utils.toArray('section').forEach(sec=>{
      const elements = sec.querySelectorAll('.section-title, .about-card, .skill-card, .project-card, .stat-box, .tl-item, .contact-info, .contact-form, .terminal, .chart-container, .cert-card');
      if(elements.length > 0){
        gsap.from(elements,{
          y:40,duration:0.8,stagger:0.1,
          scrollTrigger:{trigger:sec,start:'top 85%'}
        });
      }
    });
  }
}

/* ============ THEME SWITCHER ============ */
const themeToggle=document.querySelector('.theme-toggle');
const themeSwitcher=document.querySelector('.theme-switcher');
if(themeToggle && themeSwitcher){
  themeToggle.addEventListener('click',e=>{e.stopPropagation();themeSwitcher.classList.toggle('open');});
  document.addEventListener('click',()=>themeSwitcher.classList.remove('open'));
  document.querySelectorAll('.theme-opt').forEach(opt=>{
    opt.addEventListener('click',e=>{
      e.stopPropagation();
      document.documentElement.setAttribute('data-theme',opt.dataset.theme);
      localStorage.setItem('theme',opt.dataset.theme);
      themeSwitcher.classList.remove('open');
    });
  });
  const savedTheme=localStorage.getItem('theme');
  if(savedTheme)document.documentElement.setAttribute('data-theme',savedTheme);
}

/* ============ CHART.JS DONUT ============ */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const ctx2=document.getElementById('skillChart');
    if(ctx2 && typeof Chart !== 'undefined'){
      new Chart(ctx2,{
        type:'doughnut',
        data:{
          labels:['Python','SQL','Power BI','Excel','Data Analysis','Jira','AI Automation','ML','Deep Learning'],
          datasets:[{
            data:[18,15,14,13,16,8,16,10,8],
            backgroundColor:['#00f0ff','#ff3cac','#784ba0','#2b86c5','#ffd700','#ff6b6b','#39ff14','#ff00ff','#00ff41'],
            borderColor:'#0a0e1f',borderWidth:3
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:true,
          animation: isMobile ? {duration:0} : {animateRotate:true,duration:2000},
          plugins:{
            legend:{
              position:'bottom',
              labels:{
                color:'#e0e0e0',
                font:{size:12,family:'Poppins'},
                padding:15,
                usePointStyle:true,
                pointStyle:'circle'
              }
            },
            tooltip:{
              backgroundColor:'rgba(10,14,31,0.9)',
              titleColor:'#00f0ff',
              bodyColor:'#e0e0e0',
              borderColor:'#00f0ff',
              borderWidth:1,
              padding:12,
              callbacks:{
                label:function(context){
                  return context.label + ': ' + context.parsed + '%';
                }
              }
            }
          }
        }
      });
    }
  },3000);
});

/* ============ PROJECTS HORIZONTAL SCROLL - TOUCH OPTIMIZED ============ */
const projectsScroll = document.querySelector('.projects-scroll');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

if(scrollLeftBtn && scrollRightBtn && projectsScroll){
  scrollLeftBtn.addEventListener('click', () => {
    projectsScroll.scrollBy({left: -400, behavior: 'smooth'});
  });
  scrollRightBtn.addEventListener('click', () => {
    projectsScroll.scrollBy({left: 400, behavior: 'smooth'});
  });

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  projectsScroll.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  projectsScroll.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        projectsScroll.scrollBy({left: 340, behavior: 'smooth'});
      } else {
        projectsScroll.scrollBy({left: -340, behavior: 'smooth'});
      }
    }
  }
}

/* ============ CHATBOT ============ */
const chatToggle=document.querySelector('.chatbot-toggle');
const chatbot=document.querySelector('.chatbot');
const chatClose=document.querySelector('.chatbot-close');
const chatBody=document.querySelector('.chatbot-body');
const chatInput=document.getElementById('chatInput');
const chatSend=document.getElementById('chatSend');

if(chatToggle && chatbot){
  chatToggle.addEventListener('click',()=>chatbot.classList.toggle('open'));
}
if(chatClose && chatbot){
  chatClose.addEventListener('click',()=>chatbot.classList.remove('open'));
}

const botResponses={
  'about':"Dhanush Kumar S S is an AI Practitioner & Data Analyst with a B.Tech in AI & ML. He loves transforming data into insights and building intelligent systems! 🤖",
  'about dhanush':"Dhanush Kumar S S is an AI Practitioner & Data Analyst with a B.Tech in AI & ML. He loves transforming data into insights and building intelligent systems! 🤖",
  'skills':"His top skills include: Python 🐍, SQL 🗃️, Power BI 📈, Excel 📊, Data Analysis & EDA, Jira, AI Automation & Prompting, Machine Learning 🧠, Deep Learning 🤖, Pandas/NumPy, TensorFlow, and PySpark!",
  'projects':"He's built amazing projects like Swiggy Data Analysis, Telecom Customer Churn Prediction, ESG Data Assurance, Amazon Delivery QA, and Walmart Sales Analysis! Check his GitHub for more! 🚀",
  'contact':"You can reach him at s.s.dhanushsiva121@gmail.com or dhanushsivadk@gmail.com. Phone: +91 9789370450. He responds quickly! 📩",
  'hire':"Absolutely! Dhanush is open for opportunities. Click the 'Download CV' button on top or submit the contact form to get in touch! 💼",
  'hire him':"Absolutely! Dhanush is open for opportunities. Click the 'Download CV' button on top or submit the contact form to get in touch! 💼",
  'hello':"Hello there! 👋 How can I help you today?",
  'hi':"Hi! 👋 What would you like to know about Dhanush?",
  'hey':"Hey! 😊 Ask me anything about Dhanush!",
  'experience':"Dhanush has experience as a Data Quality Analyst at Arcadia - Urjanet (Feb 2024 - Present). He's worked on 50+ projects and 20+ ML models!",
  'education':"Dhanush completed his B.Tech in Artificial Intelligence and Machine Learning from Hindusthan College of Engineering and Technology with 90% aggregate!",
  'resume':"You can download his resume by clicking the 'Download CV' button in the hero section! 📄",
  'cv':"You can download his CV by clicking the 'Download CV' button in the hero section! 📄",
  'name':"His name is Dhanush Kumar S S! 😊",
  'thanks':"You're most welcome! 🙏 Anything else?",
  'thank you':"You're most welcome! 🙏 Anything else?",
  'bye':"Goodbye! Have a great day! 👋",
  'ai':"AI is Dhanush's passion! He builds ML models, NLP solutions, Deep Learning systems, and explores Agentic AI and n8n automation regularly! 🤖",
  'data':"Dhanush is a data wizard! 📊 He loves cleaning, analyzing, and visualizing data to uncover insights.",
  'github':"Check out his GitHub: https://github.com/Dhanush012003 🚀",
  'linkedin':"Connect with him on LinkedIn: https://www.linkedin.com/in/dhanush-kumar-3a6360222/ 💼",
  'certifications':"Dhanush is certified in: Python 101 for Data Science (IBM), Data Analysis with Python (IBM), Data Visualization Using Python (IBM), Process Data from Dirty to Clean (Google), Clean Coding (Google), SQL (NASSCOM), AI for Everyone (DeepLearning.AI), Automation 360 Excel Advanced Actions (Automation Anywhere), and Advanced Python Programming (IEEE)! 🏆"
};

function addMsg(text,sender){
  if(!chatBody)return;
  const msg=document.createElement('div');
  msg.className=`msg ${sender}`;
  msg.innerHTML=`<p>${text}</p>`;
  chatBody.appendChild(msg);
  chatBody.scrollTop=chatBody.scrollHeight;
}

function botReply(input){
  const lower=input.toLowerCase().trim();
  let reply="I'm not sure about that 🤔. Try asking about: about, skills, projects, contact, certifications, or hire!";
  for(const key in botResponses){
    if(lower.includes(key)){reply=botResponses[key];break;}
  }
  setTimeout(()=>addMsg(reply,'bot'),700);
}

function sendMsg(){
  if(!chatInput)return;
  const text=chatInput.value.trim();
  if(!text)return;
  addMsg(text,'user');
  chatInput.value='';
  botReply(text);
}

if(chatSend){
  chatSend.addEventListener('click',sendMsg);
}
if(chatInput){
  chatInput.addEventListener('keydown',e=>{if(e.key==='Enter')sendMsg();});
}
document.querySelectorAll('.quick-reply').forEach(btn=>{
  btn.addEventListener('click',()=>{
    addMsg(btn.textContent,'user');
    botReply(btn.textContent);
  });
});

/* ============ KONAMI CODE EASTER EGG ============ */
const konami=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx=0;
document.addEventListener('keydown',e=>{
  if(e.key.toLowerCase()===konami[konamiIdx].toLowerCase()){
    konamiIdx++;
    if(konamiIdx===konami.length){
      konamiIdx=0;
      openGame();
    }
  }else konamiIdx=0;
});

/* ============ SNAKE GAME ============ */
const gameModal=document.querySelector('.game-modal');
const gameClose=document.querySelector('.game-close');
const gCanvas=document.getElementById('gameCanvas');
const scoreEl=document.getElementById('score');
let snake,food,dir,gameLoop,score;

function openGame(){
  if(gameModal){
    gameModal.classList.add('show');
    startGame();
  }
}
if(gameClose){
  gameClose.addEventListener('click',()=>{
    gameModal.classList.remove('show');
    clearInterval(gameLoop);
  });
}

function startGame(){
  if(!gCanvas)return;
  snake=[{x:200,y:200}];
  food={x:Math.floor(Math.random()*20)*20,y:Math.floor(Math.random()*20)*20};
  dir={x:20,y:0};
  score=0;if(scoreEl)scoreEl.textContent=score;
  clearInterval(gameLoop);
  gameLoop=setInterval(updateGame,120);
}

function updateGame(){
  if(!gCanvas)return;
  const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
  if(head.x<0||head.x>=400||head.y<0||head.y>=400||snake.some(s=>s.x===head.x&&s.y===head.y)){
    alert('Game Over! Score: '+score);
    clearInterval(gameLoop);
    startGame();return;
  }
  snake.unshift(head);
  if(head.x===food.x&&head.y===food.y){
    score+=10;if(scoreEl)scoreEl.textContent=score;
    food={x:Math.floor(Math.random()*20)*20,y:Math.floor(Math.random()*20)*20};
  }else snake.pop();
  drawGame();
}

function drawGame(){
  if(!gCanvas)return;
  const gCtx=gCanvas.getContext('2d');
  gCtx.fillStyle='#000';gCtx.fillRect(0,0,400,400);
  gCtx.fillStyle='#ff3cac';gCtx.shadowBlur=15;gCtx.shadowColor='#ff3cac';
  gCtx.fillRect(food.x,food.y,20,20);
  gCtx.shadowBlur=10;gCtx.shadowColor='#00f0ff';
  snake.forEach((s,i)=>{
    gCtx.fillStyle=i===0?'#00f0ff':'#0099cc';
    gCtx.fillRect(s.x,s.y,18,18);
  });
}

document.addEventListener('keydown',e=>{
  if(!gameModal || !gameModal.classList.contains('show'))return;
  if(e.key==='ArrowUp'&&dir.y===0)dir={x:0,y:-20};
  else if(e.key==='ArrowDown'&&dir.y===0)dir={x:0,y:20};
  else if(e.key==='ArrowLeft'&&dir.x===0)dir={x:-20,y:0};
  else if(e.key==='ArrowRight'&&dir.x===0)dir={x:20,y:0};
});

/* ============ CONFETTI - DISABLED ON MOBILE ============ */
const confCanvas=document.getElementById('confetti-canvas');
if(confCanvas && !isMobile){
  const cCtx=confCanvas.getContext('2d');
  confCanvas.width=window.innerWidth;confCanvas.height=window.innerHeight;
  window.addEventListener('resize',()=>{confCanvas.width=window.innerWidth;confCanvas.height=window.innerHeight;});
  let confetti=[];
  class Confetti{
    constructor(){
      this.x=Math.random()*confCanvas.width;
      this.y=-10;
      this.size=Math.random()*8+4;
      this.speedY=Math.random()*3+2;
      this.speedX=Math.random()*4-2;
      this.color=['#ff3cac','#00f0ff','#ffd700','#39ff14','#ff00ff'][Math.floor(Math.random()*5)];
      this.rotation=Math.random()*360;this.rotSpeed=Math.random()*10-5;
    }
    update(){this.y+=this.speedY;this.x+=this.speedX;this.rotation+=this.rotSpeed;}
    draw(){
      cCtx.save();cCtx.translate(this.x,this.y);cCtx.rotate(this.rotation*Math.PI/180);
      cCtx.fillStyle=this.color;cCtx.fillRect(-this.size/2,-this.size/2,this.size,this.size);
      cCtx.restore();
    }
  }
  function fireConfetti(){
    for(let i=0;i<150;i++)confetti.push(new Confetti());
  }
  function animConf(){
    cCtx.clearRect(0,0,confCanvas.width,confCanvas.height);
    confetti=confetti.filter(c=>c.y<confCanvas.height+20);
    confetti.forEach(c=>{c.update();c.draw();});
    requestAnimationFrame(animConf);
  }
  animConf();

  /* ============ FORM CONFETTI ============ */
  const contactForm = document.querySelector('.contact-form');
  if(contactForm){
    contactForm.addEventListener('submit',e=>{
      e.preventDefault();
      fireConfetti();
      const btn=e.target.querySelector('button');
      const orig=btn.innerHTML;
      btn.innerHTML='<i class="fa-solid fa-check"></i> Sent!';
      btn.style.background='linear-gradient(135deg,#39ff14,#00f0ff)';
      setTimeout(()=>{btn.innerHTML=orig;btn.style.background='';e.target.reset();},3000);
    });
  }
} else if (confCanvas) {
  // Mobile: simple feedback without confetti
  const contactForm = document.querySelector('.contact-form');
  if(contactForm){
    contactForm.addEventListener('submit',e=>{
      e.preventDefault();
      const btn=e.target.querySelector('button');
      const orig=btn.innerHTML;
      btn.innerHTML='<i class="fa-solid fa-check"></i> Sent!';
      btn.style.background='linear-gradient(135deg,#39ff14,#00f0ff)';
      setTimeout(()=>{btn.innerHTML=orig;btn.style.background='';e.target.reset();},3000);
    });
  }
}

/* ============ NAVBAR SCROLL EFFECT - PASSIVE ============ */
window.addEventListener('scroll',()=>{
  const nav=document.querySelector('.navbar');
  if(nav){
    if(window.scrollY>50)nav.style.padding='12px 60px';
    else nav.style.padding='20px 60px';
  }
},{passive:true});

/* ============ CONSOLE MSG ============ */
console.log('%c🚀 Welcome to Dhanush Portfolio!','color:#00f0ff;font-size:24px;font-weight:bold;text-shadow:2px 2px #ff3cac;');
console.log('%c🤖 Built by Dhanush Kumar S S','color:#ffd700;font-size:14px;');
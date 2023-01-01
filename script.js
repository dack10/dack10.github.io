const $btnSingIn=document.querySelector('.sign-in-btn'),
      $btnSingUp=document.querySelector('.sign-up-btn'),
      $signgup=document.querySelector('.sign-up'),
      $signin=document.querySelector('.sign-in');


document.addEventListener('click',e=>{
    if(e.target===$btnSingIn || e.target===$btnSingUp){
        $signin.classList.toggle('active');
        $signgup.classList.toggle('active')
    }
})
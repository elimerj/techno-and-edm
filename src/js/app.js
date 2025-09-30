document.addEventListener('DOMContentLoaded', ()=>{startApp()});

function startApp(){
    navegationPinUp();
    createGallery();
    scrollNav();
}

function navegationPinUp(){
  const navegationBar = document.querySelector('.header');
  const lineup = document.querySelector('.lineup');
  const body  = document.querySelector('body');

  window.addEventListener('scroll', function(){
    if(lineup.getBoundingClientRect().top < 1){
      navegationBar.classList.add('header_pin-up');
      body.classList.add('body-scroll');
    }
    else{
      navegationBar.classList.remove('header_pin-up');
      body.classList.remove('body-scroll');
    }
  });

}

function createGallery(){
    const gallery = document.querySelector('.imagen-gallery');

    for(let i=1; i<=12; i++){
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
        <source srcset="public/img/thumb/${i}.avif" type="image/avif"/>
        <source srcset="public/img/thumb/${i}.webp" type="image/webp"/>
        <img width="200" height="300" loading="lazy"src="public/img/thumb/${i}.jpg" alt="imagen-galleria"/>
      `;
        gallery.appendChild(imagen);
        imagen.onclick = function (){
            showImage(i);
        }
    }
}

function scrollNav(){
  const links = document.querySelectorAll('.principal-navegation a');
  links.forEach(link=>{
    link.addEventListener('click',function(e){
      e.preventDefault(); //primero prevenir que haga lo que esta configurado a hacer xD
      //e.target apunta al elemento donde se dio click
      //e.target.attributes trae todos los atributos del elemento al que se le dio click 
      //e.target.attibutes.href.value entra en el atrubito href del elemento y me muestra el valor que existe.
      const sectionScroll = e.target.attributes.href.value; 
      const section = document.querySelector(sectionScroll);
      section.scrollIntoView({behavior:"smooth"}); //por default es el movimiento brusco, debemos agregar unos parametros para cambiar la forma de llegar ahi behavior : "smooth"
    });
  });
  
}

function showImage(id){ // para pasar parametros debe ser como un callback
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
    <source srcset="public/img/grande/${id}.avif" type="image/avif"/>
    <source srcset="public/img/grande/${id}.webp" type="image/webp"/>
    <img width="200" height="300" loading="lazy"src="public/img/grande/${id}.jpg" alt="imagen-galleria"/>
  `;

  //creamos un contenedor donde mostrar la imagen grande
const overlay = document.createElement('DIV');
overlay.append(imagen);
overlay.classList.add('overlay');
overlay.onclick = function (){
    overlay.remove();
    body.classList.remove('pin-up');
}

//boton para cerrar el modal 
const closeModal= document.createElement('P');
closeModal.textContent = 'X';
closeModal.classList.add('btn-close');
overlay.appendChild(closeModal);
closeModal.onclick = function(){
    overlay.remove();
    body.classList.remove('pin-up');
}

//agregamos el div creado arriba al body del html
const body = document.querySelector('body');
body.appendChild(overlay);
body.classList.add('pin-up');
}



//funcion que permite saber si el cliente esta dando scroll arriba o abajo 
/*var scrollPos = 0;
window.addEventListener('scroll', function(){
  if ((document.body.getBoundingClientRect()).top > scrollPos)
  console.log(`arriba , ${scrollPos}` );

  else{
    console.log(`abajo , ${scrollPos}` );
    scrollPos = (document.body.getBoundingClientRect()).top;
  }
  
});*/
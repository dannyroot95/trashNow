
var firebaseConfig = {
    apiKey: "AIzaSyC1rPBlZGVhDoca5IRkQYMOPsEJU_lKi5Q",
    authDomain: "cowiot.firebaseapp.com",
    databaseURL: "https://cowiot-default-rtdb.firebaseio.com",
    projectId: "cowiot",
    storageBucket: "cowiot.appspot.com",
    messagingSenderId: "359413020575",
    appId: "1:359413020575:web:2e64e053c12b4794d1afaa"
  };
  
firebase.initializeApp(firebaseConfig);
let db = firebase.database()
let fs = firebase.firestore()
var arrayCows = []

var existCache = localStorage.getItem("saved")


if(existCache == "true"){

  document.getElementById("getData").style = "display:block;"
  document.getElementById("loaderDiv").remove()
  
  document.getElementById("numCows").innerHTML = localStorage.getItem("numCows")
  document.getElementById("locations").innerHTML = localStorage.getItem("locations")
  document.getElementById("numAreas").innerHTML = localStorage.getItem("numAreas")
  document.getElementById("numReports").innerHTML = localStorage.getItem("numReports")

  getDataRT()
  getDataFS()
}else{
  document.getElementById("loaderDiv").style = "display:block;"
  getDataRT()
  getDataFS()
}



function getDataRT(){

  var ctx = 0

 db.ref("cows").once('value', (query) => {

  
  query.forEach(element => {

    ctx++

    db.ref('cows/'+element.key).once('value', (snapshot) => {

      snapshot.forEach(document =>{
  
        if(document.key != "location"){
          arrayCows.push(document.val())
        }
      })
  
    })
    
  });

  document.getElementById("numCows").innerHTML = ctx
  document.getElementById("locations").innerHTML = arrayCows.length

  localStorage.setItem("numCows",ctx)
  localStorage.setItem("locations",arrayCows.length) 
    
 })

}

function getDataFS(){

  let ctx = 0
  let c = 0

  let date = new Date()

  let eyes = 0 , skin = 0 , mov = 0 , hungry = 0 , tuber = 0 , clos = 0 , lep = 0 , pr = 0 , ps = 0

  let diseases = ["MASTITIS","BABESIOSIS","BRUCELOSIS","FIEBRE AFTOSA","TUBERCULOSIS","CLOSTRIDIOSIS","LEPTOSPIROSIS","PROBLEMAS EN LAS PEZUÑAS","PARÁSITOS"]
  let data = [] , dates = []

  let eyeJan = 0 , eyeFeb = 0 , eyeMar = 0 , eyeApr = 0 , eyeMay = 0 , eyeJun = 0 , eyeJul = 0 , eyeAgu = 0 , eyeSep = 0 , eyeOct = 0 , eyeNov = 0 , eyeDec = 0 

  let skinJan = 0 , skinFeb = 0 , skinMar = 0 , skinApr = 0 , skinMay = 0 , skinJun = 0 , skinJul = 0 , skinAgu = 0 , skinSep = 0 , skinOct = 0 , skinNov = 0 , skinDec = 0 

  let movJan = 0 , movFeb = 0 , movMar = 0 , movApr = 0 , movMay = 0 , movJun = 0 , movJul = 0 , movAgu = 0 , movSep = 0 , movOct = 0 , movNov = 0 , movDec = 0 

  let hungryJan = 0 , hungryFeb = 0 , hungryMar = 0 , hungryApr = 0 , hungryMay = 0 , hungryJun = 0 , hungryJul = 0 , hungryAgu = 0 , hungrySep = 0 , hungryOct = 0 , hungryNov = 0 , hungryDec = 0 

  let tuberJan = 0 , tuberFeb = 0 , tuberMar = 0 , tuberApr = 0 , tuberMay = 0 , tuberJun = 0 , tuberJul = 0 , tuberAgu = 0 , tuberSep = 0 , tuberOct = 0 , tuberNov = 0 , tuberDec = 0 

  let closJan = 0 , closFeb = 0 , closMar = 0 , closApr = 0 , closMay = 0 , closJun = 0 , closJul = 0 , closAgu = 0 , closSep = 0 , closOct = 0 , closNov = 0 , closDec = 0 

  let lepJan = 0 , lepFeb = 0 , lepMar = 0 , lepApr = 0 , lepMay = 0 , lepJun = 0 , lepJul = 0 , lepAgu = 0 , lepSep = 0 , lepOct = 0 , lepNov = 0 , lepDec = 0 
  
  let prJan = 0 , prFeb = 0 , prMar = 0 , prApr = 0 , prMay = 0 , prJun = 0 , prJul = 0 , prAgu = 0 , prSep = 0 , prOct = 0 , prNov = 0 , prDec = 0 

  let psJan = 0 , psFeb = 0 , psMar = 0 , psApr = 0 , psMay = 0 , psJun = 0 , psJul = 0 , psAgu = 0 , psSep = 0 , psOct = 0 , psNov = 0 , psDec = 0 

  let januaryX = [toTimestamp(date.getFullYear()+"/01/"+getFirstAndLastDayByMonth(0).firstDay),
  toTimestamp(date.getFullYear()+"/01/"+getFirstAndLastDayByMonth(0).lastDay+" "+"23:59:59")]

  let februaryX = [toTimestamp(date.getFullYear()+"/02/"+getFirstAndLastDayByMonth(1).firstDay),
  toTimestamp(date.getFullYear()+"/02/"+getFirstAndLastDayByMonth(1).lastDay+" "+"23:59:59")]
  
  let marchX = [toTimestamp(date.getFullYear()+"/03/"+getFirstAndLastDayByMonth(2).firstDay),
  toTimestamp(date.getFullYear()+"/03/"+getFirstAndLastDayByMonth(2).lastDay+" "+"23:59:59")]
  
  let aprilX = [toTimestamp(date.getFullYear()+"/04/"+getFirstAndLastDayByMonth(3).firstDay),
  toTimestamp(date.getFullYear()+"/04/"+getFirstAndLastDayByMonth(3).lastDay+" "+"23:59:59")]

  let mayX = [toTimestamp(date.getFullYear()+"/05/"+getFirstAndLastDayByMonth(4).firstDay),
  toTimestamp(date.getFullYear()+"/05/"+getFirstAndLastDayByMonth(4).lastDay+" "+"23:59:59")]

  let juneX = [toTimestamp(date.getFullYear()+"/06/"+getFirstAndLastDayByMonth(5).firstDay),
  toTimestamp(date.getFullYear()+"/06/"+getFirstAndLastDayByMonth(5).lastDay+" "+"23:59:59")]

  let julyX = [toTimestamp(date.getFullYear()+"/07/"+getFirstAndLastDayByMonth(6).firstDay),
  toTimestamp(date.getFullYear()+"/07/"+getFirstAndLastDayByMonth(6).lastDay+" "+"23:59:59")]

  let augustX = [toTimestamp(date.getFullYear()+"/08/"+getFirstAndLastDayByMonth(7).firstDay),
  toTimestamp(date.getFullYear()+"/08/"+getFirstAndLastDayByMonth(7).lastDay+" "+"23:59:59")]

  let septemberX = [toTimestamp(date.getFullYear()+"/09/"+getFirstAndLastDayByMonth(8).firstDay),
  toTimestamp(date.getFullYear()+"/09/"+getFirstAndLastDayByMonth(8).lastDay+" "+"23:59:59")]
  
  let octoberX = [toTimestamp(date.getFullYear()+"/10/"+getFirstAndLastDayByMonth(9).firstDay),
  toTimestamp(date.getFullYear()+"/10/"+getFirstAndLastDayByMonth(9).lastDay+" "+"23:59:59")]

  let novemberX = [toTimestamp(date.getFullYear()+"/11/"+getFirstAndLastDayByMonth(10).firstDay),
  toTimestamp(date.getFullYear()+"/11/"+getFirstAndLastDayByMonth(10).lastDay+" "+"23:59:59")]
  
  let decemberX = [toTimestamp(date.getFullYear()+"/12/"+getFirstAndLastDayByMonth(11).firstDay),
  toTimestamp(date.getFullYear()+"/12/"+getFirstAndLastDayByMonth(11).lastDay+" "+"23:59:59")]

  let eyesX = [] , skinX  = [] , movX = [] , hungryX = [] , tuberX = [] , closX = [] , lepX = [] , prX = [] , psX = []

  fs.collection("area").get().then(snapshot =>{

    snapshot.forEach(element => {
      
      ctx++

    });

  })


  fs.collection("incidents").get().then(snapshot =>{

    snapshot.forEach(element => {
      
      c++

      if(element.data().signs == diseases[0]){

        eyes++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          eyeJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          eyeFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          eyeMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          eyeApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          eyeMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          eyeJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          eyeJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          eyeAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          eyeSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          eyeOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          eyeNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          eyeDec++
        }

      }else if(element.data().signs == diseases[1]){

        skin++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          skinJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          skinFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          skinMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          skinApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          skinMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          skinJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          skinJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          skinAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          skinSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          skinOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          skinNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          skinDec++
        }



      }else if(element.data().signs == diseases[2]){
        mov++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          movJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          movFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          movMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          movApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          movMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          movJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          movJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          movAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          movSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          movOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          movNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          movDec++
        }

      }else if(element.data().signs == diseases[3]){
        hungry++

        
        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          hungryJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          hungryFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          hungryMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          hungryApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          hungryMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          hungryJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          hungryJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          hungryAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          hungrySep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          hungryOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          hungryNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          hungryDec++
        }

      }else if(element.data().signs == diseases[4]){
        tuber++

        
        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          tuberJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          tuberFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          tuberMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          tuberApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          tuberMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          tuberJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          tuberJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          tuberAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          tuberSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          tuberOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          tuberNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          tuberDec++
        }

      }else if(element.data().signs == diseases[5]){
        clos++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          closJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          closFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          closMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          closApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          closMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          closJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          closJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          closAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          closSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          closOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          closNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          closDec++
        }

      }else if(element.data().signs == diseases[6]){
        lep++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          lepJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          lepFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          lepMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          lepApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          lepMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          lepJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          lepJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          lepAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          lepSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          lepOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          lepNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          lepDec++
        }

      }else if(element.data().signs == diseases[7]){
        pr++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          prJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          prFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          prMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          prApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          prMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          prJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          prJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          prAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          prSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          prOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          prNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          prDec++
        }

      }else if(element.data().signs == diseases[8]){
        ps++

        if(element.data().date > januaryX[0] && element.data().date < januaryX[1]){
          psJan++
        }else if (element.data().date > februaryX[0] && element.data().date < februaryX[1]){
          psFeb++
        }else if (element.data().date > marchX[0] && element.data().date < marchX[1]){
          psMar++
        }else if (element.data().date > aprilX[0] && element.data().date < aprilX[1]){
          psApr++
        }else if (element.data().date > mayX[0] && element.data().date < mayX[1]){
          psMay++
        }else if (element.data().date > juneX[0] && element.data().date < juneX[1]){
          psJun++
        }else if (element.data().date > julyX[0] && element.data().date < julyX[1]){
          psJul++
        }else if (element.data().date > augustX[0] && element.data().date < augustX[1]){
          psAgu++
        }else if (element.data().date > septemberX[0] && element.data().date < septemberX[1]){
          psSep++
        }else if (element.data().date > octoberX[0] && element.data().date < octoberX[1]){
          psOct++
        }else if (element.data().date > novemberX[0] && element.data().date < novemberX[1]){
          psNov++
        }else if (element.data().date > decemberX[0] && element.data().date < decemberX[1]){
          psDec++
        }

      }

      dates.push(element.data().date)
    

    });

    eyesX = [eyeJan,eyeFeb,eyeMar,eyeApr,eyeMay,eyeJun,eyeJul,eyeAgu,eyeSep,eyeOct,eyeNov,eyeDec]
    skinX = [skinJan,skinFeb,skinMar,skinApr,skinMay,skinJun,skinJul,skinAgu,skinSep,skinOct,skinNov,skinDec]
    movX = [movJan,movFeb,movMar,movApr,movMay,movJun,movJul,movAgu,movSep,movOct,movNov,movDec]
    hungryX = [hungryJan,hungryFeb,hungryMar,hungryApr,hungryMay,hungryJun,hungryJul,hungryAgu,hungrySep,hungryOct,hungryNov,hungryDec]
    tuberX = [tuberJan,tuberFeb,tuberMar,tuberApr,tuberMay,tuberJun,tuberJul,tuberAgu,tuberSep,tuberOct,tuberNov,tuberDec]
    closX = [closJan,closFeb,closMar,closApr,closMay,closJun,closJul,closAgu,closSep,closOct,closNov,closDec]
    lepX = [lepJan,lepFeb,lepMar,lepApr,lepMay,lepJun,lepJul,lepAgu,lepSep,lepOct,lepNov,lepDec]
    prX = [prJan,prFeb,prMar,prApr,prMay,prJun,prJul,prAgu,prSep,prOct,prNov,prDec]
    psX = [psJan,psFeb,psMar,psApr,psMay,psJun,psJul,psAgu,psSep,psOct,psNov,psDec]
   
    data = [eyes,skin,mov,hungry,tuber,clos,lep,pr,ps]
  
    var min = Math.min(...dates) 
    var max = Math.max(...dates) 

    radar(data,onlyDateNumber(min),onlyDateNumber(max))
    details(eyesX,skinX,movX,hungryX,tuberX,closX,lepX,prX,psX)

    document.getElementById("numAreas").innerHTML = ctx
    document.getElementById("numReports").innerHTML = c

    localStorage.setItem("numAreas",ctx)
    localStorage.setItem("numReports",c)
    localStorage.setItem("saved","true")


    document.getElementById("getData").style = "display:block;"
    document.getElementById("loaderDiv").remove()
    
  })

}


function init(){

    var latitude 
    var longitude
    var reference = JSON.parse(localStorage.getItem("reference"));
    if (reference != null && reference != "" && reference != undefined) {
        latitude = reference.lat
        longitude = reference.lng
    }else{
        latitude = -12.591497
        longitude = -69.1978477
    }    

var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 17,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // PARA ENCERDER PUNTOS DE INTERES.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // PARA MOSTRAR LOS ELEMENTOS DEL MAPA DE GOOGLE MAPS NATIVO.
    }],
    disableDoubleClickZoom: true // ZOOM
  });

//FUNCION PARA DIBUJAR UN PUNTO DE CALOR EN EL MAPA (HEATMAP)
var heatmap = new google.maps.visualization.HeatmapLayer({
  data: [],
  map: map,
  radius: 24
});

db.ref("cows").on('child_added',
 function(snapshot) {

   var cow = snapshot.key

   db.ref("cows/"+cow).on('child_added',
   function(child) {

    child.forEach(data => {

        if(child.key != "location"){
            
            var point = new google.maps.LatLng(child.val().latitude, child.val().longitude);
            heatmap.getData().push(point);
           }
        
       });

   })
});

}

function radar(values,min,max){

  let diseases =  ["MASTITIS","BABESIOSIS","BRUCELOSIS","FIEBRE AFTOSA","TUBERCULOSIS","CLOSTRIDIOSIS","LEPTOSPIROSIS","PROBLEMAS EN LAS PEZUÑAS","PARÁSITOS"]

  let chartConfig = {
    gui: {
      contextMenu: {
        backgroundColor: '#306EAA', // sets background for entire contextMenu
        button: {
          backgroundColor: '#2D66A4',
          lineColor: '#2D66A4',
          visible: true,
        },
        docked: true,
        gear: {
          alpha: 1,
          backgroundColor: '#2D66A4',
        },
        item: {
          backgroundColor: '#306EAA',
          borderColor: '#306EAA',
          borderWidth: '0px',
          color: '#fff',
          fontFamily: 'Lato',
        },
        position: 'right',
      },
    },
    graphset: [
      {
        type: 'ring',
        backgroundColor: '#FBFCFE',
        title: {
          text: 'Porcentaje de enfermedades',
          fontColor: '#1E5D9E',
          fontFamily: 'Lato',
          fontSize: '14px',
          padding: '15px',
        },
        subtitle: {
          text: min+"   -   "+max,
          fontColor: '#777',
          fontFamily: 'Lato',
          fontSize: '12px',
          padding: '5px',
        },
        legend: {
          adjustLayout: true,
          align: 'center',
          backgroundColor: '#FBFCFE',
          borderWidth: '0px',
          padding: '15px',
          item: {
            cursor: 'pointer',
            fontColor: '#777',
            fontSize: '5px',
            offsetX: '-6px',
          },
          marker: {
            type: 'circle',
            borderWidth: '0px',
            cursor: 'pointer',
            size: 4,
          },
          mediaRules: [
            {
              maxWidth: '500px',
              visible: false,
            },
          ],
          toggleAction: 'remove',
          verticalAlign: 'bottom',
        },
        plot: {
          tooltip: {
            text: '<span style="color:%color">%t</span><br><span style="color:%color">Registros : %v</span>',
            anchor: 'c',
            backgroundColor: 'none',
            borderWidth: '0px',
            fontSize: '16px',
            mediaRules: [
              {
                maxWidth: '500px',
                y: '54%',
              },
            ],
            sticky: true,
            thousandsSeparator: ',',
            x: '50%',
            y: '50%',
          },
          valueBox: [
            {
              type: 'all',
              text: '%t',
              placement: 'out',
            },
            {
              type: 'all',
              text: '%npv%',
              placement: 'in',
            },
          ],
          animation: {
            effect: 'ANIMATION_EXPAND_VERTICAL',
            sequence: 'ANIMATION_BY_PLOT_AND_NODE',
          },
          backgroundColor: '#FBFCFE',
          borderWidth: '0px',
          hoverState: {
            cursor: 'hand',
          },
          slice: '60%',
        },
        plotarea: {
          margin: '70px 0px 10px 0px',
          backgroundColor: 'transparent',
          borderRadius: '10px',
          borderWidth: '0px',
        },
        scaleR: {
          refAngle: 270,
        },
        series: [
          {
            text: diseases[0],
            values: [values[0]],
            backgroundColor: '#00BAF2',
            lineColor: '#00BAF2',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#00BAF2',
            },
          },
          {
            text: diseases[1],
            values: [values[1]],
            backgroundColor: '#E80C60',
            lineColor: '#E80C60',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#E80C60',
            },
          },
          {
            text: diseases[2],
            values: [values[2]],
            backgroundColor: '#9B26AF',
            lineColor: '#9B26AF',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#9B26AF',
            },
          },
          {
            text: diseases[3],
            values: [values[3]],
            backgroundColor: '#5ddb00',
            lineColor: '#5ddb00',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#5ddb00',
            },
          },
          {
            text: diseases[4],
            values: [values[4]],
            backgroundColor: '#D4AC0D',
            lineColor: '#D4AC0D',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#D4AC0D',
            },
          },
          {
            text: diseases[5],
            values: [values[5]],
            backgroundColor: '#592BC4',
            lineColor: '#592BC4',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#592BC4',
            },
          },
          {
            text: diseases[6],
            values: [values[6]],
            backgroundColor: '#C4492B',
            lineColor: '#C4492B',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#C4492B',
            },
          },
          {
            text: diseases[7],
            values: [values[7]],
            backgroundColor: '#2BC4BB',
            lineColor: '#2BC4BB',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#2BC4BB',
            },
          },
          {
            text: diseases[8],
            values: [values[8]],
            backgroundColor: '#E7009E',
            lineColor: '#E7009E',
            lineWidth: '1px',
            marker: {
              backgroundColor: '#E7009E',
            },
          },
        ],
        noData: {
          text: 'No Selection',
          alpha: 0.6,
          backgroundColor: '#20b2db',
          bold: true,
          fontSize: '18px',
          textAlpha: 0.9,
        },
      },
    ],
  };
  
  zingchart.render({
    id: 'radarChart',
    data: chartConfig,
    height: '100%',
    width: '100%',
  });
}

function onlyDateNumber(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();

    if(date <=9){
      date = "0"+date
    }
  var time = date + '/' + month + '/' + year;
  return time;
}


function getFirstAndLastDayByMonth(value){

let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]  

var date = new Date();
var primerDia = new Date(date.getFullYear(),value, 1);
var ultimoDia = new Date(date.getFullYear(),value + 1, 0);

var json = {
  
  firstDay : primerDia.getDate(),
  lastDay : ultimoDia.getDate(),
  month : months[value]

}

return json

}


function toTimestamp(strDate){
	var datum = new Date(strDate).getTime();
	return datum;
 }
  

 function details(array1,array2,array3,array4,array5,array6,array7,array8,array9){

  let eyesMax = Math.max(... array1)
  let skinMax = Math.max(... array2)
  let movMax = Math.max(... array3)
  let hungryMax = Math.max(... array4)
  let tuberMax = Math.max(... array5)
  let closMax = Math.max(... array6)
  let lepMax = Math.max(... array7)
  let prMax = Math.max(... array8)
  let psMax = Math.max(... array9)

  let eyesMin = Math.min(... array1)
  let skinMin = Math.min(... array2)
  let movMin = Math.min(... array3)
  let hungryMin = Math.min(... array4)
  let tuberMin = Math.min(... array5)
  let closMin = Math.min(... array6)
  let lepMin = Math.min(... array7)
  let prMin = Math.min(... array8)
  let psMin = Math.min(... array9)
  let mins = [eyesMin,skinMin,movMin,hungryMin,tuberMin,closMin,lepMin,prMin,psMin]
 
  let maxValue = eyesMax+skinMax+movMax+hungryMax+tuberMax+closMax+lepMax+prMax+psMax
  let minValue = Math.min(... mins)


  let chartConfig = {
    type: 'area',
    theme: 'classic',
    backgroundColor: '#fff',

    legend: {
      align: 'center',
      backgroundColor: '#145A32',
      borderColor: '#808080',
      fontFamily: 'Lato',
      item: {
        fontColor: '#ffffff',
        markerStyle: 'match',
      },
      layout: 'float',
      toggleAction: 'remove',
    },
    plot: {
      tooltip: {
        visible: false,
      },
      tooltipText: '%t: %v',
      activeArea: true,
      animation: {
        delay: 500,
        effect: 'ANIMATION_EXPAND_BOTTOM',
        speed: 600,
      },
      shadow: false,
      stacked: true,
    },
    plotarea: {
      margin: '10% 8% 14% 12%',
    },
    scaleX: {
      values: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      guide: {
        lineColor: '#808080',
        lineStyle: 'solid',
      },
      item: {
        fontColor: '#808080',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: 'normal',
        offsetY: '5%',
      },
      lineColor: '#808080',
      lineStyle: 'solid',
      lineWidth: '1px',
      tick: {
        lineColor: '#808080',
        lineWidth: '1px',
      },
    },
    scaleY: {
      values: '0:'+maxValue+'+:'+minValue+'',
      format: '%v R',
      guide: {
        alpha: 0.1,
        lineColor: '#808080',
        lineStyle: 'solid',
      },
      item: {
        fontColor: '#808080',
        fontFamily: 'Lato',
        fontSize: '12px',
        fontWeight: 'normal',
        offsetX: '-5%',
      },
      lineColor: '#808080',
      lineWidth: '1px',
      tick: {
        lineColor: '#808080',
        lineWidth: '1px',
      },
    },
    crosshairX: {
      lineColor: '#FFFFFF',
      lineWidth: '2px',
      marker: {
        visible: false,
      },
      offsetY: '10%',
      plotLabel: {
        text: '<strong>%t</strong>: %v Registros',
        fontColor: '#000000',
        fontFamily: 'Lato',
      },
      scaleLabel: {
        offsetY: '5%',
      },
    },
  
    series: [
      {
        text: 'MASTITIS',
        values: array1,
        backgroundColor: '#00BAF2',
        lineColor: '#00BAF2',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#00BAF2',
          borderColor: '#00BAF2',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'BABESIOSIS',
        values: array2,
        backgroundColor: '#E80C60',
        lineColor: '#E80C60',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#E80C60',
          borderColor: '#E80C60',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'BRUCELOSIS',
        values: array3,
        backgroundColor: '#9B26AF',
        lineColor: '#9B26AF',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#9B26AF',
          borderColor: '#9B26AF',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'FIEBRE AFTOSA',
        values: array4,
        backgroundColor: '#5ddb00',
        lineColor: '#5ddb00',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#5ddb00',
          borderColor: '#5ddb00',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'TUBERCULOSIS',
        values: array5,
        backgroundColor: '#D4AC0D',
        lineColor: '#D4AC0D',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#D4AC0D',
          borderColor: '#D4AC0D',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'CLOSTRIDIOSIS',
        values: array6,
        backgroundColor: '#592BC4',
        lineColor: '#592BC4',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#592BC4',
          borderColor: '#592BC4',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'LEPTOSPIROSIS',
        values: array7,
        backgroundColor: '#C4492B',
        lineColor: '#C4492B',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#C4492B',
          borderColor: '#C4492B',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'PROBLEMAS EN LAS PEZUÑAS',
        values: array8,
        backgroundColor: '#2BC4BB',
        lineColor: '#2BC4BB',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#2BC4BB',
          borderColor: '#2BC4BB',
          fontSize: '10px',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
      {
        text: 'PARÁSITOS',
        values: array9,
        backgroundColor: '#E7009E',
        lineColor: '#E7009E',
        lineWidth: '2px',
        marker: {
          type: 'circle',
          backgroundColor: '#E7009E',
          borderColor: '#E7009E',
          fontSize: '10px',
          borderWidth: '0px',
          shadow: false,
          size: '4px',
        },
      },
    ],
  };
  
  zingchart.render({
    id: 'dashChart',
    data: chartConfig,
    height: '100%',
    width: '100%',
  });
}


  google.maps.event.addDomListener(window, 'load', init);

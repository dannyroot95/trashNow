let selector = document.getElementById("inputGroupSelectType"); 
createDatatable()

let cacheV = localStorage.getItem("users")
let vCache = JSON.parse(cacheV)


if(vCache == null){
  document.getElementById("bgspinner").style = "display:block;"
  getUsersFromDatabase()
}else{
  document.getElementById("bgspinner").style = "display:none;"
  getUsersFromCache()
}

selector.addEventListener("change", () => {
      // if value switched by client
        if(selector.value == "1"){
            document.getElementById("li-b").style = "display:none;"
            document.getElementById("li").value = ""
        }else{
            document.getElementById("li-b").style = "display:flex;"
        }
      });
   

function createDatatable(){

  $('#tb-data').DataTable({
      language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
            "infoEmpty": "<b>Mostrando 0 to 0 of 0 datos</b>",
            "infoFiltered": "(Filtrado de _MAX_ total datos)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ datos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar en la lista: ",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
     },scrollY: '50vh',scrollX: true, sScrollXInner: "100%",
     scrollCollapse: true,
    });

    var table = $('#tb-data').DataTable();
    $('#container').css( 'display', 'block' );
    table.columns.adjust().draw();
    document.getElementById("tb-data_filter").style = "margin-bottom:10px;"
    document.getElementById("tb-data_length").style = "margin-bottom:10px;"
    let button = '<button style="margin-left:10px;" onclick="showAddModal()" class="btn btn-primary">Agregar usuario</button>'
    $(button).appendTo('#tb-data_length')
}



function showAddModal(){
    $('#modalShow').modal('show')
  }
  
  function closeAddModal(){
    $('#modalShow').modal('hide')
  }
  
  function clearInputs(){
    document.getElementById("dni").value = ""
    document.getElementById("fullname").value = ""
    document.getElementById("inputGroupSelectType").value = "0"
    document.getElementById("li").value = ""
    document.getElementById("password").value = ""
    document.getElementById("phone").value = ""
    document.getElementById("lastname").value = ""
}


function createUser(){

  let dni = document.getElementById("dni").value
  let lastname = document.getElementById("lastname").value
  let name = document.getElementById("fullname").value
  let type = document.getElementById("inputGroupSelectType").value
  let lic = document.getElementById("li").value
  let phone = document.getElementById("phone").value
  let password = document.getElementById("pass").value
  let email = document.getElementById("email").value

  if(dni != "" && lastname !="" && name != "" && type != "" && password != "" && email != ""){
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user.uid;

    let data = {
      dni : dni,
      brandCar : null,
      colorCar : null,
      email : email,
      id : user,
      image : null,
      lastname : lastname,
      name : name,
      phone : phone,
      plateNumber : null,
      token : "",
      type : lic
    }

    db.collection("Drivers").doc(user).set(data)
    closeAddModal()
    Swal.fire(
      'Muy bien!',
      'Usuario creado!',
      'success'
    )
    clearInputs()

    // ...
  })
  .catch((error) => {

    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  }else{
    Swal.fire(
      'Oops!',
      'Complete los campos!',
      'info'
    )
  }

}

function getUsersFromDatabase(){

  db.collection("Drivers").onSnapshot((querySnapshot) => {

    let ctx = 0

      users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        
        $('#tb-data').DataTable().destroy()
        $("#tbody").html(
      users
        .map((v) => {

          let t = v.type
          let x = ""
    
          if(t == "1"){
            x = "Administrador"
          }else{
            x = "Conductor"
          }

          ctx++

          return `
          <tr style="cursor: pointer">
          <td><strong>${ctx}</strong></td>
          <td>${v.lastname+" "+v.name}</td>
          <td>${(v.dni)}</td>
          <td>${v.email}</td>
          <td>${v.phone}</td>
          <td>${x}</td>
          </tr>`;
       
         
        })
        .join("")
    );

    //console.log(students)
    createDatatable()
    localStorage.setItem("users",JSON.stringify(users))
    document.getElementById("bgspinner").style = "display:none;"
     
           
  }, (error) => {
    console.log(error)
}); 

}

function getUsersFromCache(){

  let ctx = 0
   
    $('#tb-data').DataTable().destroy()
    $("#tbody").html(
  vCache
    .map((v) => {

      let t = v.type
      let x = ""

      if(t == "1"){
        x = "Administrador"
      }else{
        x = "Conductor"
      }

      ctx++

        return `
        <tr style="cursor: pointer">
        <td><strong>${ctx}</strong></td>
        <td>${v.lastname+" "+v.name}</td>
        <td>${(v.dni)}</td>
        <td>${v.email}</td>
        <td>${v.phone}</td>
        <td>${x}</td>
        </tr>`;
     
    })
    .join("")
);

//console.log(students)
createDatatable()
document.getElementById("bgspinner").style = "display:none;"
getUsersFromDatabase() 

}
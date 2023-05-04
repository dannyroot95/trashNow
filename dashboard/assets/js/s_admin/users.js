var dni = document.getElementById('dni')
let selector = document.getElementById("inputGroupSelectType"); 
createDatatable()

dni.addEventListener('input', updateValue);
function updateValue(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').toLowerCase()
    var xDNI = e.srcElement.value
    if(xDNI.length == 8){
      fetchDNI(xDNI)
    }else{
        clearInputs()
    }
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
    document.getElementById("dni").disabled = false
    document.getElementById("fullname").value = ""
    document.getElementById("inputGroupSelectType").value = "0"
    document.getElementById("li").value = ""
    document.getElementById("pass").value = ""
}

function fetchDNI(value){

let token = "63TM2UW53E8161HMCB9YRBVBDHIMZ5UT"
 
fetch('https://cowmanager.site/api/controllerDNI.php'+"?dni="+value,{
  method: "GET",
  headers: {
      Authorization: `Bearer ${token}`
  }
 })
  .then(response => response.json())
  .then(data => {

      console.log(data)

  }).catch(err => {
    Swal.fire(
        'Oopss!',
        'Error 404!',
        'info'
      )
  });  

}
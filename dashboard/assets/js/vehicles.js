
var report = []

createDatatable()
let cacheV = localStorage.getItem("vehicles")
let vCache = JSON.parse(cacheV)


if(vCache == null){
  document.getElementById("bgspinner").style = "display:block;"
  getVehiclesFromDatabase()
}else{
  getVehiclesFromCache()
}

function getVehiclesFromDatabase(){

  db.collection("vehicles").onSnapshot((querySnapshot) => {

    report = []
    let ctx = 0

      vehicles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        $('#tb-data').DataTable().destroy()
        $("#tbody").html(
      vehicles
        .map((v) => {

          let color = `background-color:#EBEBEB;`
          if(v.color == "2"){
            color = `background-color:#002005;`
          }else if(v.color == "3"){
            color = `background-color:#A98D00;`
          }

          let data = {
            "Placa":v.placa,
            "Modelo":v.marca,
            "Soat":v.soat,
          }

          report.push(data)

          ctx++

            return `
            <tr style="cursor: pointer">
            <td><strong>${ctx}</strong></td>
            <td><ion-icon name="card-outline"></ion-icon>&nbsp;${v.placa}</td>
            <td><ion-icon name="car-outline"></ion-icon>&nbsp;${(v.marca)}</td>
            <td style="${color}"></td>
            <td>${v.soat}</td>
            <td><center><button onclick="deleteVehicle('${v.id}')" class="btn btn-danger">Eliminar</button></center></td>
            </tr>`;
         
        })
        .join("")
    );

    //console.log(students)
    createDatatable()
    localStorage.setItem("vehicles",JSON.stringify(vehicles))
    document.getElementById("bgspinner").style = "display:none;"
     
           
  }, (error) => {
    console.log(error)
}); 

}

function getVehiclesFromCache(){

  let ctx = 0
  report = []
   
    $('#tb-data').DataTable().destroy()
    $("#tbody").html(
  vCache
    .map((v) => {
        
      let color = `background-color:#EBEBEB;`
      if(v.color == "2"){
        color = `background-color:#002005;`
      }else if(v.color == "3"){
        color = `background-color:#A98D00;`
      }

      let data = {
        "Placa":v.placa,
        "Modelo":v.marca,
        "Soat":v.soat,
      }

      report.push(data)

      ctx++

        return `
        <tr style="cursor: pointer">
        <td><strong>${ctx}</strong></td>
        <td><ion-icon name="card-outline"></ion-icon>&nbsp;${v.placa}</td>
        <td><ion-icon name="car-outline"></ion-icon>&nbsp;${(v.marca)}</td>
        <td style="${color}"></td>
        <td>${v.soat}</td>
        <td><center><button onclick="deleteVehicle('${v.id}')" class="btn btn-danger">Eliminar</button></center></td>
        </tr>`;
     
    })
    .join("")
);

//console.log(students)
createDatatable()
document.getElementById("bgspinner").style = "display:none;"
getVehiclesFromDatabase() 

}

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
    let button = '<button style="margin-left:10px;" onclick="showAddModal()" class="btn btn-success"><ion-icon name="add-circle"></ion-icon>&nbsp;Agregar vehículo</button>'
    button = button+'&nbsp;&nbsp;<button onclick="exportToExcel()" class="btn btn-primary"><ion-icon name="print"></ion-icon>&nbsp;Reporte</button>'
    $(button).appendTo('#tb-data_length')

}


function showAddModal(){
  $('#modalShow').modal('show')
}

function closeAddModal(){
  $('#modalShow').modal('hide')
}

function saveVehicle(){

  let marca = document.getElementById("mv").value
  let placa = document.getElementById("pl").value
  let soat = document.getElementById("so").value
  let obs = document.getElementById("ob").value
  let color = document.getElementById("inputGroupSelectColor").value

  if(marca != "" && placa != "" && soat != "" && color != ""){

    let x = { id:"" ,marca : marca , placa:placa , soat:soat , obs:obs , color:color}
    db.collection("vehicles").add(x).then(function(docRef) {
      db.collection("vehicles").doc(docRef.id).update({id:docRef.id})
  })
    Swal.fire(
      'Muy bien!',
      'Vehículo agregado!',
      'success'
    )
    clearInputs()
    closeAddModal()

  }else{
    Swal.fire(
      'Oopss!',
      'Complete los campos!',
      'info'
    )
  }

}

function clearInputs(){
  document.getElementById("mv").value = ""
  document.getElementById("pl").value = ""
  document.getElementById("so").value = ""
  document.getElementById("ob").value = ""
}

function deleteVehicle(id){

  db.collection("vehicles").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
  Swal.fire(
    'Muy bien!',
    'Vehiculo eliminado!',
    'success'
  )

}


function exportToExcel(){


  Swal.fire({
      title: 'En breves se descargará el archivo!',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
    })

  let xls = new XlsExport(report, 'reporte');
  xls.exportToXLS(`vehiculos.xls`)
}

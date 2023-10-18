

  let report = []
  allIncidents()

  function allIncidents(){

    document.getElementById("bgspinner").style = "display:block;"
    report = []

    db.collection("incidents").onSnapshot((snapshot) => {

        var ctx = 0

        incidents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        $("#tbody").html(
            incidents
              .map((file) => {

                let data = {
                  "Nombre del conductor":file.user,
                  "DNI":file.dni,
                  "Teléfono":file.phone,
                  "Placa de vehículo":file.plate,
                  "Referencia de incidente":file.reference,
                  "Fecha":onlyDateNumber(file.date*1000)+" "+onlyHour(file.date*1000),
                  "Latitud":file.latitude,
                  "Longitud":file.longitude
                }
                report.push(data)

                ctx++
                return `
                <tr>
                <td>${ctx}</td>
                <td>${file.user}</td>
                <td>${file.dni}</td>
                <td>${file.phone}</td>
                <td>${file.plate}</td>
                <td>${file.reference}</td>
                <td>${onlyDateNumber(file.date*1000)+" "+onlyHour(file.date*1000)}</td>
                <td><center><button onclick="showModalDetail(${file.latitude},${file.longitude})" class="btn btn-danger"><ion-icon name="location"></ion-icon>&nbsp;Ver ubicación</button></center></td>
                </tr>
                `;
              })
              .join("")
          );
          createDatatable()
          document.getElementById("bgspinner").style = "display:none;"
    })

  }

  function createDatatable(){

    $('#tb-incident').DataTable({
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
      let button = '<button style="margin-bottom:8px;margin-left:8px;" class="btn btn-success" onclick="exportToExcel()" id="btn-report"><ion-icon name="document"></ion-icon>&nbsp;Generar reporte</button>'
      $(button).appendTo('#tb-incident_length')
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

  function onlyHour(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    var stringhour = hour
    var stringmin = min
    var stringseg = sec

    if(hour <=9){
      stringhour = "0"+hour
   }
    if(min <=9){
       stringmin = "0"+min
    }
    if(sec <=9){
      stringseg = "0"+sec
    }

    var time = stringhour + ':' + stringmin ;

    return time;
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
    xls.exportToXLS(`reporte_de_incidentes.xls`)
  }

  function showModalDetail(lat,lon){
    const modal = new bootstrap.Modal(document.getElementById('incidentShow'));
    modal.show()
    initMap(lat,lon)
  }


  function initMap(latitud,longitud) {

    // Opciones del mapa
    var mapOptions = {
      zoom: 15,
      center: { lat: latitud, lng: longitud }
    };
  
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
    // Crear un marcador
    var marker = new google.maps.Marker({
      position: { lat: latitud, lng: longitud }, // Coordenadas del marcador
      map: map, // Asociar el marcador con el mapa
      title: 'Incidente' // Título del marcador (opcional)
    });
  
    // Puedes agregar marcadores u otras personalizaciones al mapa si lo deseas.
  }

  window.onload = initMap;
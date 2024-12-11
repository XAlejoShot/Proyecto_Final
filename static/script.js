


function calcularPaneles() {
    const kwMes = parseFloat(document.getElementById("kwMes").value);
    const horasLuz = parseFloat(document.getElementById("horasLuz").value);

    if (!kwMes || !horasLuz || kwMes <= 0 || horasLuz <= 0) {
        document.getElementById("resultado").innerHTML = "<div class='alert alert-danger'><h4>Error:</h4><p>Por favor, seleccione valores válidos.</p></div>";
        return;
    }

    // Suposiciones:
    const eficienciaPanel = 0.18; // Eficiencia promedio del 18%
    const potenciaPanel = 0.3; // Cada panel genera 0.3 kW en condiciones óptimas

    // Cálculos:
    const energiaDiaria = kwMes / 30; // Consumo diario en kWh
    const energiaSolarDiaria = horasLuz * potenciaPanel * eficienciaPanel; // Energía producida por un panel al día
    const panelesNecesarios = Math.ceil(energiaDiaria / energiaSolarDiaria); // Número de paneles necesarios

    // Resultado:
    const resultadoHTML = `
        <div class='alert alert-success'>
            <h4>Resultados:</h4>
            <table class="results-table">
                <tr>
                    <th>Parámetro</th>
                    <th>Valor</th>
                </tr>
                <tr>
                    <td>Consumo mensual:</td>
                    <td>${kwMes.toFixed(2)} kWh</td>
                </tr>
                <tr>
                    <td>Horas de luz solar:</td>
                    <td>${horasLuz.toFixed(2)} horas/día</td>
                </tr>
                <tr>
                    <td>Paneles necesarios:</td>
                    <td>${panelesNecesarios} panel(es)</td>
                </tr>
                <tr>
                    <td>Eficiencia de los paneles:</td>
                    <td>${(eficienciaPanel * 100).toFixed(2)}%</td>
                </tr>
            </table>
        </div>
    `;
    document.getElementById("resultado").innerHTML = resultadoHTML;
}

document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("cargarDatosBtn");
    boton.addEventListener("click", cargarData);
});

function cargarData() {
    $.ajax({
        url: '/cargarfuentedatos',
        type: 'GET',
        success: function(r) {
            $("#resultado_datos").html(r); // Cambié esto para insertar en #resultado_datos
            $('#t_datos').DataTable({
                "destroy": true,
                "paging": true,
                "searching": true,
                "ordering": true
            });
        },
        error: function(error) {
            $("#resultado_datos").html("<h3>Error al cargar los datos</h3>");
            console.log("Error:", error);
        }
    });
}

function mostrarGrafico() {
    $.ajax({
        url: '/graficar/' + $("#sl_paises").val() + "/" + $("#sl_grafico").val(),
        type: 'GET',
        success: function(r) {
            $("#resultado_datos").html(r);
        }
    });
}


document.getElementById('formularioDatos').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío del formulario para manejarlo manualmente
    const nombre = document.getElementById('nombrePersona').value.trim();
    const apellido = document.getElementById('apellidoPersona').value.trim();
    const correo = document.getElementById('correoElectronico').value.trim();
    const telefono = document.getElementById('telefonoUsuario').value.trim();

    if (!nombre || !apellido || !correo || !telefono) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    alert('¡Gracias por contactarnos! Procesaremos tu información.');
});


const ingresos = [
    new Ingreso('Sueldo', 2300),
    new Ingreso('Venta auto', 1500),
];

const egresos = [
    new Egreso('Renta departamento', 1000),
    new Egreso('Ropa', 500)
];
//onload 
let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos(); 
}
//funcion total ingresos
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
//funcion total egresos
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}
//cabecero recupera la info de ingresos y egresos para calcular el total
let cargarCabecero = ()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

//dar formato Intl
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-PY',{style:'currency', currency:'PYG', minimumFractionDigits:0});
}

const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

//cargar ingresos|| ingresos HTML se llama asi por que se van a agregar elementos HTML
const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

//crear ingreso
const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

//metodo eliminar ingreso
const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso=> ingreso.id === id);
    //for(let ingreso of ingresos)
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

//cargar egreso
const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}
//crear egreso
const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
         <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"
                        onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                     </button>
            </div>
        </div>
     </div>
    `;
    return egresoHTML;
}

//metodo eliminar egreso
let eliminarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex(egreso=> egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

//agregar dato
let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !==''){
        if(tipo.value ==='ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}
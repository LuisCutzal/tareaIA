function reflex_agent(location, state){
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

function test(states, visitedStates){
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    
    // Registrar la acción en el log
    document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
    
    // Actualizar el estado según la acción
    if (action_result == "CLEAN"){
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";
    
    // debemos de llevar el registro de los estados visitados
    var currentStateKey = states.join(',');
    visitedStates.add(currentStateKey);
    
    // aca es cuando ya se visitaron todos los estados, este se detiene
    if (visitedStates.size == 8) {
        document.getElementById("log").innerHTML += "<br>All states visited. Stopping.";
        return;
    }
    
    // Continuar con la siguiente iteración después de 5 segundos
    setTimeout(function(){ test(states, visitedStates); }, 5000);
}

// Inicializar el estado y el conjunto de estados visitados
var states = ["A", "DIRTY", "DIRTY"];
var visitedStates = new Set();
test(states, visitedStates);

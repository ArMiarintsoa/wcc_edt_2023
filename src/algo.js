var matieres = [
    { nom: "SGBD", heures: 0 },
    { nom: "Admin systeme et reseau", heures: 0 },
    { nom: "Developpement WEB", heures: 0 },
    { nom: "Algorithme", heures: 0 },
    { nom: "Communication", heures: 0 },
    { nom: "Anglais", heures: 0 }
  ];
  
  var heuresMin = 2;
  var heuresMax = 6;
  var heuresEtudeJour = 8;
  
  var joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  
  // Demander à l'utilisateur d'entrer les heures pour chaque matière
  for (var i = 0; i < matieres.length; i++) {
    var matiere = matieres[i];
  
    //  MAMPIDITRA HEURES
    do {
      matiere.heures = parseInt(prompt("Entrez le nombre d'heures pour " + matiere.nom));
    } while (isNaN(matiere.heures) || matiere.heures < heuresMin || matiere.heures > heuresMax);
  }

  var heuresMax = -Infinity;
  for(let i = 0; i < matieres.length; i++){
    var mt = matieres[i];
    if(mt.heures > heuresMax) {
      heuresMax = mt.heures;
    }
  }
  var emploiDuTemps = [];
  var joursDisponibles = joursSemaine.slice();
  
  var matieresDisponibles = matieres.slice();
  while (joursDisponibles.length > 0) {
    var jour = joursDisponibles.shift();
  
    var heuresRestantes = heuresEtudeJour;
  
    while (matieresDisponibles.length > 0 && heuresRestantes > 0) {
      var indexMatiere = matieresDisponibles.length-1;
      var matiere = matieresDisponibles[indexMatiere];
  
      if (matiere.heures <= heuresRestantes) {
        emploiDuTemps.push({ jour: jour, matiere: matiere.nom, heures: matiere.heures });
        heuresRestantes -= matiere.heures;
        matieresDisponibles.splice(indexMatiere, 1);
      } else {
        matiere.heures -= heuresRestantes;
        emploiDuTemps.push({ jour: jour, matiere: matiere.nom, heures: heuresRestantes });
        heuresRestantes = 0;
      }
    }
  }

  const findDiff = (emploiDuTemps ,i4, val) => {
    for(let i = 0; i < emploiDuTemps.length; i++){
      let idx = i4 % (emploiDuTemps.length-1);
      if(emploiDuTemps[idx].matiere!== val){
        return idx;
      }
      i4++;
    }
  }


  //  Sarahana tsy hifanesy andro ny matiere iray
  for(let i = 0;i < emploiDuTemps.length-(6-heuresMax+4); i++) {
    for(let j = 1; j < (6-heuresMax+4); j++){
      if((i+j)<=emploiDuTemps.length) {
        if(emploiDuTemps[i].matiere == emploiDuTemps[i+j].matiere){   
          let idx = findDiff(emploiDuTemps, i+(6-heuresMax+4), emploiDuTemps[i+j].matiere);
          if(idx!==null){
            let tmpmt = emploiDuTemps[idx].matiere;
            emploiDuTemps[idx].matiere = emploiDuTemps[i+j].matiere;
            emploiDuTemps[i+j].matiere = tmpmt;
    
            let tmpHr = emploiDuTemps[idx].heures;
            emploiDuTemps[idx].heures = emploiDuTemps[i+j].heures;
            emploiDuTemps[i+j].heures = tmpHr;            
          }
        }
      }
    }
  }
  
  console.log("Emploi du temps :");
  for (var i = 0; i < emploiDuTemps.length; i++) {
    var cours = emploiDuTemps[i];
    console.log(cours.jour + " : " + cours.matiere + " (" + cours.heures + " heures)");
  }
  
  //  SORTIE 
  //  emploiDuTemps : array de { jour: , matiere: , heures: }
console.log("hello wooorld!")

function saveFunction() {
  console.log("save")
    var name = document.getElementById("fname").value;
    submitOK = "true";
    if (name.length > 255 || name.length < 2) {
      alert("The name may have no more than 2 characters or more than 255 chars");
      submitOK = "false";

      return false;
    }


    myUrl="https://api.genderize.io/?name="+name;
    res=httpGet(myUrl); 
    //if rea is null //TODO
    console.log(res);
    var mydata = JSON.parse(res);
    document.getElementById("probabilitylabel").innerHTML = mydata.probability;
    document.getElementById("genderlabel").innerHTML = mydata.gender;
    
    var gender;
    if (document.getElementById('female').checked || document.getElementById('male').checked) {
      gender=document.querySelector('input[name="gender"]:checked').value;
      console.log(gender,name)
      localStorage.setItem(name, gender);
      document.getElementById("savedgenderlabel").innerHTML = gender;
    }else{
      document.getElementById("savedgenderlabel").innerHTML = mydata.gender;
      gender= mydata.gender
    }
    localStorage.setItem( name,gender);

    if (submitOK == "false") {
      return false;
    }
    }


function submitFunction() {
    console.log("submit")

    var name = document.getElementById("fname").value;
    submitOK = "true";
    if (name.length > 255 || name.length < 2) {
      alert("The name may have no more than 2 characters or more than 255 chars");
      submitOK = "false";

      return false;
    }
    myUrl="https://api.genderize.io/?name="+name;
    res=httpGet(myUrl); 
    //if rea is null //TODO
    console.log(res);

    var mydata = JSON.parse(res);
    document.getElementById("genderlabel").innerHTML = mydata.gender;
    document.getElementById("probabilitylabel").innerHTML = mydata.probability;

    if (localStorage.getItem(name)){
      document.getElementById("savedgenderlabel").innerHTML = localStorage.getItem(name);
      }else{
      document.getElementById("savedgenderlabel").innerHTML = 'not saved';
      }

    if (submitOK == "false") {
        return false;
    }

}
function clearFunction() {
    console.log("clear")
    var name = document.getElementById("fname").value;
    submitOK = "true";
    if (name.length > 255 || name.length < 2) {
      alert("The name may have no more than 2 characters or more than 255 chars");
      submitOK = "false";

      return false;
    }

    localStorage.removeItem( name);
    document.getElementById("savedgenderlabel").innerHTML = '---';
    

}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
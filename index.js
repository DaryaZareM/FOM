console.log("hello wooord!")

function saveFunction() {
    var name = document.getElementById("fname").value;
    
    submitOK = "true";

    if (name.length > 255 && name.length < 2) {
      alert("The name may have no more than 2 characters or more than 255 chars");
      submitOK = "false";
    }
    
    var gender=document.querySelector('input[name="gender"]:checked').value;
    console.log(gender,name)

    if (submitOK == "false") {
      return false;
    }

    }
function submitFunction() {
    console.log("submit")

    var name = document.getElementById("fname").value;
    submitOK = "true";
    if (name.length > 255 && name.length < 2) {
      alert("The name may have no more than 2 characters or more than 255 chars");
      submitOK = "false";
    }
    console.log(name)
    myUrl="https://api.genderize.io/?name="+name;
    res=httpGet(myUrl); 
    console.log(res);

    var mydata = JSON.parse(res);
    document.getElementById("genderlabel").innerHTML = mydata.gender;
    document.getElementById("probabilitylabel").innerHTML = mydata.probability;

    document.getElementById("savedgenderlabel").innerHTML = mydata.gender;

    if (submitOK == "false") {
        return false;
    }

}
function clearFunction() {
    dconsole.log("clear")
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
/**
 * @
 * @returns nothing if had no errors
 * @returns FALSE if sth was wrong
 * this function do action if save butten clicked
 * - it request to site and shows results
 * - if radio button has clicked save that and if not save the prediction result
 */
 function checkFormat(name) {
  var isValid=!(/^[a-z A-Z]+$/i.test(name))
  if (name.length > 255 || name.length < 2 || isValid) {
    alert("The name may have no more than 2 characters or more than 255 chars or has not only english chars");
    document.getElementById("myAlert").innerHTML ="The name may have no more than 2 characters or more than 255 chars or has not only english chars";
    return false;
  }
  return true;

 }
 /**
  * clear gender radio buttons
  */
 function clearAllRadios() {
  var radList = document.getElementsByName('gender');
  for (var i = 0; i < radList.length; i++) {
    if(radList[i].checked) radList[i].checked = false;
  }
}

function saveFunction() {
  document.getElementById("myAlert").innerHTML ="";
  console.log("save")
    var name = document.getElementById("fname").value;
    submitOK = "true";
    /**
     * handle if input schem was not valid 
     * */
    if (!checkFormat(name)) {
      return false;
    }
    document.getElementById("genderlabel").innerHTML = '';
    document.getElementById("probabilitylabel").innerHTML = '';

    var gender;
    if (document.getElementById('female').checked || document.getElementById('male').checked) {
      gender=document.querySelector('input[name="gender"]:checked').value;
      console.log(gender,name)
      localStorage.setItem(name, gender);
      document.getElementById("savedgenderlabel").innerHTML = gender;
    }else{
      myUrl="https://api.genderize.io/?name="+name;
    res=httpGet(myUrl);
    if(!res){
      return false;
    } 
    console.log(res);
    var mydata = JSON.parse(res);
    /**
     * if response was null the name hasn't exist on site's database
     */
    if (mydata.gender===null){
      document.getElementById("myAlert").innerHTML ="server dose not have this name!";
      document.getElementById("genderlabel").innerHTML = 'null';
      document.getElementById("probabilitylabel").innerHTML = mydata.probability;
    }else{
      document.getElementById("genderlabel").innerHTML = mydata.gender;
      document.getElementById("probabilitylabel").innerHTML = mydata.probability;
    }
      if (mydata.gender===null){
        document.getElementById("savedgenderlabel").innerHTML = 'nul';
        gender= 'null'
      }
      document.getElementById("savedgenderlabel").innerHTML = mydata.gender;
      gender= mydata.gender
    }
    clearAllRadios();
    /**
     * save name and gender on local Storage
     */
     
    localStorage.setItem( name,gender);
    }


/**
 * @
 * @returns nothing if had no errors
 * @returns FALSE if sth was wrong
 * this function do action if submit butten clicked
 * - it request to site and shows gender
 * - it shows savet amount if has exist on local storage
 */
function submitFunction() {
    document.getElementById("myAlert").innerHTML ="";
    var name = document.getElementById("fname").value;
    submitOK = "true";
    /**
     * handle if input schem was not valid
     * */
    if (!checkFormat(name)) {
      return false;
    }

    myUrl="https://api.genderize.io/?name="+name;
    res=httpGet(myUrl); 
    if(!res){
      return false;
    }
    console.log(res);
    var mydata = JSON.parse(res);
    /**
     * if response was null the name hasn't exist on site's database
     */
    if (mydata.gender===null){
      document.getElementById("myAlert").innerHTML ="server dose not have this name!";
      document.getElementById("genderlabel").innerHTML = 'null';
      document.getElementById("probabilitylabel").innerHTML = mydata.probability;

    }else{
      document.getElementById("genderlabel").innerHTML = mydata.gender;
      document.getElementById("probabilitylabel").innerHTML = mydata.probability;
    }
    /**
     * shows gender if has exist on local storage
     */
    if (localStorage.getItem(name)){
      document.getElementById("savedgenderlabel").innerHTML = localStorage.getItem(name);
    }else{
      document.getElementById("savedgenderlabel").innerHTML = 'not saved';
    }
    clearAllRadios()
}
/**
 * @returns nothing if had no errors
 * @returns FALSE if sth was wrong
 * this function do action if submit butten clicked
 * - it request to site and shows gender
 * - it shows savet amount if has exist on local storage
 */
function clearFunction() {
    document.getElementById("myAlert").innerHTML ="";
    console.log("clear")
    var name = document.getElementById("fname").value;
    submitOK = "true";
    /**
     * handle if input schem was not valid
     * */
     if (!checkFormat(name)) {
      return false;
    }

    localStorage.removeItem( name);
    document.getElementById("savedgenderlabel").innerHTML = '---';
    clearAllRadios()

}

/**
 * 
 * @param {string} theUrl site url
 * @returns site answer
 * send a GET request and return a JSON
 */
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    try
    {
      xmlHttp.send( null );
    }
    catch(e)
    {
      document.getElementById("myAlert").innerHTML ="ERROR not connected";
      return false;
    }
    
    return xmlHttp.responseText;
}
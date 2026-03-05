const Countries = [
  { CountryId: 1, CountryName: 'India' }, { CountryId: 2, CountryName: 'Australia' }
]
const States = [
  { StateID: 1, StateName: 'Telangana', CountryId: 1 },
  { StateID: 2, StateName: 'AndhraPradesh', CountryId: 1 },
  { StateID: 3, StateName: 'Melbourne', CountryId: 2 },
  { StateID: 4, StateName: 'Sydney', CountryId: 2 },
];
const cities = [
  { CityId: 1, CityName: 'Hyderabad', StateID: 1 },
  { CityId: 2, CityName: 'Vijayawada', StateID: 2 },
  { CityId: 3, CityName: 'SouthWale', StateID: 3 },
  { CityId: 4, CityName: 'Portmouth', StateID: 4 }
];  

const University = [
  { UniversityId: 1, Universityname: 'JNTU', city: 1 },
  { UniversityId: 2, Universityname: 'OU', city: 2 },
  { UniversityId: 3, Universityname: 'PlymoyUc', city: 3 },
  { UniversityId: 4, Universityname: 'AusOu', city: 4 },
];


const Colleges = [
  { CollegeId: 1, CollegeName: 'VignanInstofEngg&Tech', UniversityId: 1 },
  { CollegeId: 2, CollegeName: 'CBITEngg', UniversityId: 2 },
  { CollegeId: 3, CollegeName: 'Australi ui ersity', UniversityId: 3 },
  { CollegeId: 4, CollegeName: 'Melourr uiversity', UniversityId: 4 },
];
const Programs = [
  { ProgramId: 1, ProgramName:   { Programcode:[  'EEE',   'ECE',  'Mechanical',   'AE',   'CSE' ]}, CollegeId:1},
    { ProgramId: 2, ProgramName: { Programcode:[  'EEE',   'ECE',  'Mechanical',   'AE',   'CSE' ]}, CollegeId: 2 },

]
 
function onCountrychange(countryId) {
  const StateDropdown = document.getElementById("state")
  const CityDropdown = document.getElementById("city")
  //clear method
  StateDropdown.innerHTML = '<option value="" selected disabled>Select A State</option>'
  CityDropdown.innerHTML = '<option value="" selected disabled>Select A City</option>'
  const data = States.filter(state => state.CountryId === +countryId)
  data.forEach(state => {
    const option = document.createElement("option")
    option.value = state.StateID,
      option.text = state.StateName,
      StateDropdown.appendChild(option)
  })
}
function onStatechange(StateId) {
  const CityDropdown = document.getElementById("city")
  CityDropdown.innerHTML = '<option value="" selected disabled>Select A City</option>'
  const citydata = cities.filter((city) => city.StateID === +StateId)
  citydata.forEach(city => {
    const option = document.createElement("option")
    option.value = city.CityId,
      option.text = city.CityName,
      CityDropdown.appendChild(option)
  })
}
function onCitychange(cityId) {
  const UniversityDropdown = document.getElementById("University")
  UniversityDropdown.innerHTML = '<option value="" selected disabled>Select A University</option>'
  const unidata = University.filter((uni) => uni.city === +cityId)  
  unidata.forEach(uni => {
    const option = document.createElement("option")
    option.value = uni.UniversityId,
      option.text = uni.Universityname,
      UniversityDropdown.appendChild(option)
  })
}
function onUniversitychange(universityId) {
  
  const Collegedropdown = document.getElementById("college")
  Collegedropdown.innerHTML = '<option value="" selected disabled>Select A College</option>'
  const colldata = Colleges.filter((college) => college.UniversityId === +universityId)
  colldata.forEach(college => {
    const option = document.createElement("option")
    option.value = college.CollegeId,
      option.text = college.CollegeName,
      Collegedropdown.appendChild(option)
  })
}
function oncollegechange(collegeId) {
  const ProgramDropdown = document.getElementById("Program")
  ProgramDropdown.innerHTML = '<option value="" selected disabled>Select A Program</option>'
  const prgmdata = Programs.filter(program => program.CollegeId === +collegeId);
  prgmdata.forEach(program => {
    const option = document.createElement("option");
    option.value = program.ProgramId;
    option.text = program.ProgramName;
    ProgramDropdown.appendChild(option);
  })
}
let students = []
let editIndex = null

function saveStudent() {

const student = {

firstName: document.getElementById("firstName").value,
surname: document.getElementById("surname").value,
age: document.getElementById("age").value,
mobile: document.getElementById("mobileNumber").value,
email: document.getElementById("Email").value,
country: document.getElementById("country").value,
state: document.getElementById("state").value,
city: document.getElementById("city").value,
university: document.getElementById("University").value,
college: document.getElementById("college").value,
program: document.getElementById("Program").value,
year: document.getElementById("Year").value

 

}

if(editIndex !== null){

students[editIndex] = student
editIndex = null

}else{

students.push(student)
loadData()

}

displayStudents()

}
 function displayStudents(){

const tbody = document.querySelector("#studentTable tbody")

tbody.innerHTML = ""

students.forEach((stu,index)=>{

const row = document.createElement("tr")

row.innerHTML = `
<td>${index+1}</td>
<td>${stu.firstName}</td>
<td>${stu.surname}</td>
<td>${stu.age}</td>
<td>${stu.mobile}</td>
<td>${stu.email}</td>
<td>${stu.country}</td>
<td>${stu.state}</td>
<td>${stu.city}</td>
<td>${stu.university}</td>
<td>${stu.college}</td>
<td>${stu.program}</td>
<td>${stu.year}</td>

<td>
<button onclick="editStudent(${index})">Edit</button>
<button onclick="deleteStudent(${index})">Delete</button>
</td>
`

tbody.appendChild(row)

})

}
function deleteStudent(index){

students.splice(index,1)

displayStudents()

}
function editStudent(index){

const stu = students[index] 
document.getElementById("firstName").value = stu.firstName
document.getElementById("surname").value = stu.surname      

document.getElementById("age").value = stu.age
document.getElementById("mobileNumber").value = stu.mobile
document.getElementById("Email").value = stu.email
document.getElementById("country").value = stu.country
document.getElementById("state").value = stu.state
document.getElementById("city").value = stu.city
document.getElementById("University").value = stu.university
document.getElementById("college").value = stu.college
document.getElementById("Program").value = stu.program
document.getElementById("Year").value = stu.year    
}
// Load data on page load
loadData()
function loadData() {
var storedStudents = localStorage.getItem("students");
  if (storedStudents!== null) {
    students = JSON.parse(storedStudents);
    displayStudents();
  }
}

 
students=students.map(item=>{
  if(typeof item==="string"){
    return{name:item,completed:false  };
  }
})


 
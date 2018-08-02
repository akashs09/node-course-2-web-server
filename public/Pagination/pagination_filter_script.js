
$(document).ready(function() {
//store entire list
const studentList = document.querySelectorAll(".student-item");

//grab refrerence to ul for event delegation
const listBubble = document.querySelector('ul.student-list');

$('.page-header').append('<div class="student-search"> <input placeholder="Search for students..."><button>Search</button></div>');


$('button').click(function() {
    searchList();
});


appendPageLinks(studentList);

function appendPageLinks(studentList)
{
  let studentListLength = studentList.length; //11
  //create # of pages (10 per page)
  let numOfPages = Math.ceil(studentListLength/10); //2
  //start dynamically creating the page links section
  let $paginationLinksHTML = '<div class = "pagination"><ul>';
  for (let i = 1; i <= numOfPages; i++)
    {
      if (i === 1) {
        $paginationLinksHTML += '<li><a class="active" href="#">'+i+'</a></li>';
      }
      else {
        $paginationLinksHTML += '<li><a href="#">'+i+'</a></li>';
      }
    }
  $paginationLinksHTML += '</ul></div>';
  //end creation and append the links secions
  $('.student-list').append($paginationLinksHTML);
  //find the active page number and assign it
  let pageActive = $('.active').text();
  showPage(pageActive, studentList);
  listBubble.addEventListener('click', (event) => {
    //  $('.active').toggleClass('active');
    $('.active').removeClass('active');
    $(event.target).addClass('active');
    showPage(event.target.textContent,studentList);
  });

}

function showPage(pageActive, studentList){
  $('.student-item').hide();
  let startIndex = 10*pageActive-10;
  let endIndex = 10*pageActive-1;
  //loop through and display only the selected students based on pg#
  for (let i = startIndex; i <= endIndex; i++) {
    // if (studentList[i] === true) {
    //   studentList[i].style.display= 'block';
    // }
    studentList[i].style.display= 'block';
    // break;
  }
}


function searchList() {
  const $searchString = $('input').val();
  let matchList = [];
  $('.pagination').remove();
  let names = document.querySelectorAll('h3');
  let emails = document.querySelectorAll('.email');
  let j = 0;
  //check the full length and if its a substring then assign it to matchList array
  for (let i = 0; i < studentList.length; i++)
  {
    if (((names[i].innerHTML.indexOf($searchString)) >-1 ||  ((emails[i].innerHTML.indexOf($searchString))>-1))) {
        j++;
        matchList.push(studentList[i]);
    }
  }
  console.log(matchList.length);
  //check if anything was matched
   if (matchList.length === 0)
  {
    $('.student-list').hide(function() {
      $('.student-search').append('<div><h1> No student matches with: '+$searchString+'</h1></div>');
    });
  }
  //all results fit on 1 page
   if (j<11) {
     showPage(1,matchList);
  }
  //more than 2 pages -- need to call appendPageLinks fcn
  else if (j>=11) {
    appendPageLinks(matchList);
  }
}
});

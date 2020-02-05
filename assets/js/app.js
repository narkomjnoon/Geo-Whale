import '../css/app.scss';

// any CSS you import will output into a single css file (app.css in this case)
const $ = require('jquery');
// this "modifies" the jquery module: adding behavior to it
// the bootstrap module doesn't export/return anything
require('fontawesome');
require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');
require('bootstrap');
require('animate.css');
require('select2');
require('hamburger');

// or you can include specific pieces
// require('bootstrap/js/dist/tooltip');
// require('bootstrap/js/dist/popover');

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});


(function ($) {
    "use strict";
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})($);

$(function (){
    $('#formulaire').submit(function (e){
      e.preventDefault();
      $('.error').empty();
      let postdata = $('#formulaire').serialize();
  
      $.ajax({
        type: 'POST',
        url: '/mail',
        data: postdata,
        dataType: 'json',
        success: function(result){
            console.log(result)
          if(result.isSuccess){
            $("#formulaire").append("<p class='validation'>Votre mail m'a bien été transmis !</p>");
            $("#formulaire")[0].reset();
          }
          else{
            $("#nom + .error").html(result.nomerror);
            $("#email + .error").html(result.emailerror);
            $("#message + .error").html(result.messageerror);
          }
        }
      });
    });
  })

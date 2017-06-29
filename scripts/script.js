$(document).ready(function () {
    $('#red-countdown').countdowntimer({ // success timer and redirect
        seconds : 15,
        expiryUrl : 'http://www..pl/'
    });

    $('#fail-countdown').countdowntimer({ // after 3 times wrong attempt timer and redirect
    	minutes : 30,
        seconds : 00,
        expiryUrl : 'index.html'
    });

    var attempt = 3;
    var attemptToken = 3;
    var loginChecked = false;

    $('#countdownContainer').hide();

    $('#submit').on('click', function() {
    	var login = $('#login').val();
    	var token = $('#tokenInput').val();
    	var regLoginMail = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
    	var regLoginPhone = new RegExp(/^(?:[0+]48)?\d{9}$/i);
    	var regToken = new RegExp(/^[a-zA-Z0-9]*$/i);
    	
    	var validLoginMail = regLoginMail.test(login);
    	var validLoginPhone = regLoginPhone.test(login);
    	var validToken = regToken.test(token);
    	var validLogin = validLoginMail || validLoginPhone == true;
    	var isTokenInput = $('#tokenInput').length; // check if input token is exsist

		if (validLogin == true){ // mail and phone validation
			$('#-error').hide();
			$('#login').removeClass('error');

			if(loginChecked === false) { // good mail and phone validation 
				toastr.success('Zalogowano poprawnie');
				$('#login').prop('disabled', true);
				loginChecked = true;

				$('#tokenAppend').slideDown().append('<input type="text" id="tokenInput" placeholder="wpisz token" title="Wpisz Token" name="token" id="token" class="form-control" required>');
				$('#countdownContainer').show();
				$('#countdown').countdowntimer({
					minutes : 3,
					seconds : 00,
					expiryUrl : 'timeout.html'
				});

				return false;
			}		

			if (isTokenInput == 1 && validToken == true && token != ''){ //good token 
				toastr.success('Poprawny token przekierowanie');
				window.location.replace('success.html');
				return false;

			} else if(token != ''){ // bad token
				attemptToken --;				
				toastr.error('Niestety token jest nieprawidłowy lub wygasł. Spróbuj ponownie. Ilość prób: ' + attemptToken);

					if( attemptToken == 0){ // 3 times bad token
						window.location.replace('fail.html');
						return false;
					}
				return false;
			}

			attempt --;	
			toastr.error('Nie odnaleziono danego telefonu lub emaila w bazie. Spróbuj ponownie. Ilość prób: ' + attempt);
		
			if( attempt == 0){ // 3 times bad login
				window.location.replace('fail.html');
				return false;
			}

			return false;

		} else if (login != '') { // bad login
	
			$('#login').addClass('error');
			$('#-error').show();
			return false;
			
		}
    });    
});


<?php
/* 
 * Form processing for the forms present in the template
 */

$message = '';

// Alert messages
$success = '<div class="alert alert-success" role="alert">'
         . '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
         . '<strong>Thank you</strong>, Your message has been sent!</div>';

$fail    = '<div class="alert alert-danger" role="alert">'
         . '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
         . '<strong>There was a problem</strong>, your message was not sent.  Please try and submit the form again.</div>';

// About Us Page Form Submission
if ( isset( $_POST['from_form']) && $_POST['from_form'] == 'main-page') {
	if (isset($_POST['email'])) {
		$subject = $_POST['subject'];
    	$message = send_mail_confirm( $_POST['name'], $_POST['email'], $subject, $_POST['message'] );
	}
    if( $message ){
		$message = $success;
    } else {
		$message = $fail;
    }
// Single Blog Entry Form
} elseif (isset($_POST['from_form']) && $_POST['from_form'] == 'blogpage') {
	if (isset($_POST['email'] ) ) {
		$message = send_mail_confirm( $_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'], '', $_POST['url'] );
        if( $message ){
            $message = $success;
        } else {
            $message = $fail;
        }
	}
}

echo json_encode($message);  // Send back our success or fail message

function send_mail_confirm( $name, $email, $subject, $message, $phone='', $url=''){

    $to       = 'whatevers@mailinator.com'; // Your Email Address
    $msg 	  = '<p>Name : ' . $name . '</p>';
    $msg     .= '<p>Email : ' . $email . '</p>';
	if ($phone) {
        $msg .= '<p>Phone Number : ' . $phone . '</p>';
    }
	if ($url) {
		$msg .= '<p>URL : ' . $url . '</p>';
	}
    $msg     .= '<p>Message : ' . $message . '</p>';

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    return mail($to, $subject, $msg, $headers);
}


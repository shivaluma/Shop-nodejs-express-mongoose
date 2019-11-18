<?php

    // youremail here
    $to = "yourmail@gmail.com";
    $from = 'email';
    $name = 'name';
    $headers = "From: $from";
    $subject = "You have a message.";

    $fields = array();
    $fields{"name"} = "Your Name";
    $fields{"email"} = "Your Email";
    $fields{"subject"} = "subject";
    // $fields{"company"} = "Your Company";
    $fields{"message"} = "Your Message";

    $body = "Here is what was sent:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s:%s\n",$b,$_REQUEST[$a]); }

    $send = mail($to, $subject, $body, $headers);

?>

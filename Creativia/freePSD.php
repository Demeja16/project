<?php

$to = "demeja16@gmail.com";

$name = trim($_POST["free_psd_name"]);
$email = trim($_POST["free_psd_email"]);

if ( $_POST['free_psd_op_1'] == ''){
	$psd_op_1 = "NOT CHECKED";
}else {
	$psd_op_1 = "Option One Checked";
}

if ( $_POST['free_psd_op_2'] == ''){
	$psd_op_2 = "NOT CHECKED";
}else {
	$psd_op_2 = "Option Two Checked";
}

if ( $_POST['free_psd_op_3'] == ''){
	$psd_op_3 = "NOT CHECKED";
}else {
	$psd_op_3 = "Option Three Checked";
}

if ( $_POST['free_psd_op_4'] == ''){
	$psd_op_4 = "NOT CHECKED";
}else {
	$psd_op_4 = "Option Four Checked";
}

if ( $_POST['free_psd_op_5'] == ''){
	$psd_op_5 = "NOT CHECKED";
}else {
	$psd_op_5 = "Option Five Checked";
}

if ( $_POST['free_psd_op_6'] == ''){
	$psd_op_6 = "NOT CHECKED";
}else {
	$psd_op_6 = "Option Six Checked";
}
/*$psd_op_1 = isset($_POST["free_psd_op_1"]);
$psd_op_2 = isset($_POST["free_psd_op_2"]);
$psd_op_3 = isset($_POST["free_psd_op_3"]);
$psd_op_4 = isset($_POST["free_psd_op_4"]);
$psd_op_5 = isset($_POST["free_psd_op_5"]);
$psd_op_6 = isset($_POST["free_psd_op_6"]);*/

$userMessage = "Name: $name\n Email: $email\n Option One: $psd_op_1\n Option Two: $psd_op_2\n Option Three: $psd_op_3\n Option Four: $psd_op_4\n Option Five: $psd_op_5\n Option Six: $psd_op_6\n";

$pagetitle = "Новая заявка с сайта Creativia";
mail($to, $pagetitle, $userMessage, "Content-type: text/plain; charset=\"utf-8\"\n From: $to");
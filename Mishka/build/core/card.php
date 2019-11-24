<?php 
	//read json
	$json = file_get_contents('../products.json');
	$json = json_decode($json, true);

	//message
	$message = '';
	$message .= '<h1 style="text-align:center; color:#444;font-family:Arial,sans-serif;">Новый заказ из магазина Mishka</h1>';
	$message .= '<h2 style="text-align:center; color:#444;font-family:Arial,sans-serif;">Данные заказчика</h2>';
	$message .= "<table style='width: 100%; border-collapse:collapse;color:#444;font-family:Arial,sans-serif;'>";
	$message .= "<tr style='background-color: #f8f8f8;'>";
	$message .= "<td style='padding: 10px; border: #63d1bb 1px solid;'><b>Телефон: </b></td>";
	$message .= "<td style='padding: 10px; border: #63d1bb 1px solid;'>".$_POST['cTel']."</td>";
	$message .= "</tr>";
	$message .= "<tr style='background-color: #f8f8f8;'>";
	$message .= "<td style='padding: 10px; border: #63d1bb 1px solid;'><b>E-mail: </b></td>";
	$message .= "<td style='padding: 10px; border: #63d1bb 1px solid;'>".$_POST['cEmail']."</td>";
	$message .= "</tr>";
	$message .= "<tr style='background-color: #f8f8f8;'>";
	$message .= "<td style='padding: 10px; border: #63d1bb 1px solid;'><b>Пожелания: </b></td>";
	$message .= "<td style='padding: 10px; border: #63d1bb 1px solid;'>".$_POST['cOp']."</td>";
	$message .= "</tr>";
	$message .= "</table>";
	$message .= '<h2 style="text-align:center; color:#444;font-family:Arial,sans-serif;">Заказанные товары</h2>';
	$message .= "<table style='width: 100%; border-collapse:collapse;'>";
	$message .= "<th style='padding: 10px; border: #63d1bb 1px solid;background-color:#CFD8DC;'><b>Название товара: </b><th style='padding: 10px; border: #63d1bb 1px solid;background-color:#CFD8DC;'><b>Стоимость за 1 шт: </b></th></th><th style='padding: 10px; border: #63d1bb 1px solid;background-color:#CFD8DC;'><b>Количество: </b></th><th style='padding: 10px; border: #63d1bb 1px solid;background-color:#CFD8DC;'><b>Общая стоимость: </b></th>";

	$card = $_POST['card'];
	$sum = 0;

	foreach ($card as $id=>$count) {
		$name = $json[$id]['name']; 
		$cost = $json[$id]['cost'];
		$price = $count*$json[$id]['cost'];
		$message .= "
			<tr style='background-color: #f8f8f8;'>
				<td style='padding: 10px; border: #63d1bb 1px solid;'><b>$name</b></td>
				<td style='padding: 10px; border: #63d1bb 1px solid;'><b>$cost</b></td>
				<td style='padding: 10px; border: #63d1bb 1px solid;'>$count</td>
				<td style='padding: 10px; border: #63d1bb 1px solid;'>$price</td>
			</tr>";
			$sum = $sum + $price;
		}

	$message .= "</table>";
	$message .= '<h2 style="text-align:center; color:#444;font-family:Arial,sans-serif;">Cумма заказа: '.$sum.' </h2>';

	$to = "nmalkin98@rambler.ru".',';
	$to .= $_POST['cEmail'];
	$specText = '<!DOCTYPE html>
	<html><head><title>Заказ в магазине Mishka</title></head><body>';
	$headers = 'MIME-Version: 1.0'. "\r\n";
	$headers .=  'Content-Type: text/html; charset=utf-8'. "\r\n";

	$m = mail($to, 'Заказ в магазине Mishka', $specText.$message.'</body></html>', $headers);
?>
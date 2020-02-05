<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class FormController extends AbstractController
{
    /**
     * @Route("/form", name="form")
     */
    public function index()
    {
$array = [];

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $array["species"] = ($_POST["species"]);
    $array["date"] = ($_POST["date"]);
    $array["isSuccess"] = true;
    $emailContent = "";

    if (empty($array["species"])){
        $array["specieserror"] = "Ce champ est requis";
        $array["isSuccess"] = false;
    } else {
        $emailContent .="Espèces : {$array["species"]}\n";
    }
    if (empty($array["date"])){
        $array["dateerror"] = "Ce champ est requis";
        $array["isSuccess"] = false;
    } else {
        $emailContent .="Date: {$array["date"]}\n";
    }
        // if ($array["isSuccess"]){
        //     $headers = "From: {$array["nom"]} <{$array["email"]}>\r\nReply-To: {$array["email"]}";
        //     mail($myemail, $array["sujet"], $emailContent, $headers);
        // }

    header('Content-type: application/json');
    echo json_encode($array);
}
    }
}

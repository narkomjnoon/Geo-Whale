<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class MailController extends AbstractController
{
    /**
     * @Route("/mail", name="mail")
     */
    public function mail()
    {
        $array = array("nom" => "", "email" => "", "message" => "", "nomerror" => "", "emailerror" => "", "messageerror" => "", "isSuccess" => false);
        $myemail = "jmaldiney@gmail.com";
        function verify($var)
        {
            $var = trim($var);
            $var = stripslashes($var);
            $var = htmlspecialchars($var);
            return $var;
        }

        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $array["nom"] = verify($_POST["nom"]);
            $array["email"] = verify($_POST["email"]);
            $array["message"] = verify($_POST["message"]);
            $array["isSuccess"] = true;
            $emailContent = "";

            if (empty($array["nom"])) {
                $array["nomerror"] = "Ce champ est requis";
                $array["isSuccess"] = false;
            } else {
                $emailContent .= "Nom : {$array["nom"]}\n";
            }
            if (empty($array["email"])) {
                $array["emailerror"] = "Ce champ est requis";
                $array["isSuccess"] = false;
            } else {
                $emailContent .= "Email : {$array["nom"]}\n";
            }
            if (empty($array["message"])) {
                $array["messageerror"] = "Ce champ est requis";
                $array["isSuccess"] = false;
            } else {
                $emailContent .= "Message : {$array["message"]}\n";
            }

            if ($array["isSuccess"]) {
                $headers = "From: {$array["nom"]} <{$array["email"]}>\r\nReply-To: {$array["email"]}";
                mail($myemail, $emailContent, $headers);
            }
        }
        $array = json_encode($array);
        return new Response($array);
    }
}

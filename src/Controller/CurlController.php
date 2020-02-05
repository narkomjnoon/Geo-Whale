<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class CurlController extends AbstractController
{
    /**
     * @Route("/curl", name="curl")
     */
    public function curl()
    {
        $curl = curl_init();

        $vars = $_POST;
        $qparams = "";

        foreach ($vars as $key => $value) {
            $value = str_replace(' ', '%20', $value);
            $qparams .= "&" . $key . "=" . $value;
        }

        $url = "http://hotline.whalemuseum.org/api.json?limit=1000" . $qparams;
        
        curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache"
        ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        return new Response($response);
    }
}

<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="security_login", methods={"POST"})
     */
    public function login()
    {
        /** @var User $user */
        $user = $this->getUser();

        return $this->json([
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]);
    }
}

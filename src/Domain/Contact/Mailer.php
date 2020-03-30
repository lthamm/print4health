<?php

declare(strict_types=1);

namespace App\Domain\Contact;

use RuntimeException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class Mailer
{
    private MailerInterface $mailer;
    private Environment $twig;
    private string $from;

    public function __construct(
        MailerInterface $mailer,
        Environment $twig,
        string $from
    ) {
        $this->mailer = $mailer;
        $this->twig = $twig;
        $this->from = $from;
    }

    public function send($params): void
    {
        $mailBody = $this->twig->render(
            '/email/contact_form.html.twig',
            $params);

        $email = new Email();
        $email->subject($params['subject'])
              ->html($mailBody)
              ->cc($params['email'])
              ->to("contact@print4health.org")
              ->from($this->from);
        
        if($params['filePath']){
            $fileContent = file_get_contents($params['filePath']);
            $email->attach($fileContent, $params['fileName']);
        }
        
        try {
            $this->mailer->send($email);
        } catch (TransportExceptionInterface $transportException) {
            throw new RuntimeException('E-Mail could not be send!', 0, $transportException);
        }
    }
}
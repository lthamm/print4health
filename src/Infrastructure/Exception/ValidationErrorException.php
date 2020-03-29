<?php

declare(strict_types=1);

namespace App\Infrastructure\Exception;

use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Throwable;

/**
 * Class ValidationErrorException.
 *
 * @psalm-suppress TooManyTemplateParams
 */
class ValidationErrorException extends \RuntimeException
{
    /**
     * @var ConstraintViolationListInterface<int, ConstraintViolationInterface>
     */
    private ConstraintViolationListInterface $errors;

    private string $type;

    /**
     * ValidationErrorException constructor.
     *
     * @psalm-suppress TooManyTemplateParams
     *
     * @param ConstraintViolationListInterface<int, ConstraintViolationInterface> $errors
     * @param string                                                              $type
     * @param string                                                              $message
     * @param int                                                                 $code
     * @param Throwable                                                           $previous
     */
    public function __construct(
        ConstraintViolationListInterface $errors,
        $type = '',
        $message = 'Data is invalid',
        $code = 0,
        Throwable $previous = null
    ) {
        parent::__construct($message, $code, $previous);
        $this->errors = $errors;
        $this->type = $type;
    }

    /**
     * @psalm-suppress TooManyTemplateParams
     *
     * @return ConstraintViolationListInterface<int, ConstraintViolationInterface>
     */
    public function getErrors(): ConstraintViolationListInterface
    {
        return $this->errors;
    }

    public function getType(): string
    {
        return $this->type;
    }
}

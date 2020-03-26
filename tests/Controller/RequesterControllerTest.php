<?php

declare(strict_types=1);

namespace App\Tests\Controller;

// TODO: Add test for showAction
class RequesterControllerTest extends AbstractControllerTest
{
    /**
     * @group functional
     */
    public function testListAction(): void
    {
        $client = static::createClient();

        $client->request('GET', '/requester');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('requester', $data);

        foreach ($data['requester'] as $requester) {
            $this->singleRequester($requester);
        }
    }

    private function singleRequester(array $requester): void
    {
        $this->assertIsString($requester['id']);
        $this->assertIsString($requester['email']);
        $this->assertIsString($requester['name']);

        $this->assertArrayHasKey('streetAddress', $requester);
        $this->assertArrayHasKey('postalCode', $requester);
        $this->assertArrayHasKey('addressCity', $requester);
        $this->assertArrayHasKey('addressState', $requester);
    }

    public function createRequesterDataProvider(): array
    {
        return [
            [
                [
                    'email' => 'unittester@print4health.org',
                    'password' => '123465789',
                    'name' => 'Unit Tester Hospital',
                    'streetAddress' => 'Salzstraße 123',
                    'postalCode' => '48155',
                    'addressCity' => 'Münster',
                    'addressState' => 'NRW',
                ],
            ],
        ];
    }

    /**
     * @group functional
     * @dataProvider createRequesterDataProvider
     */
    public function testCreateActionWithAdminLogIn(array $requestContent): void
    {
        $client = static::createClient();

        $this->logInAdmin($client);

        $client->request('POST', '/requester', [], [], [], json_encode($requestContent));

        $this->assertEquals(201, $client->getResponse()->getStatusCode());

        $data = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('requester', $data);

        $this->singleRequester($data['requester']);
    }

    /**
     * @group functional
     * @dataProvider createRequesterDataProvider
     */
    public function testFailCreateActionWithMakerLogIn(array $requestContent): void
    {
        $client = static::createClient();

        $this->logInMaker($client);

        $client->request('POST', '/requester', [], [], [], json_encode($requestContent));

        $this->assertEquals(403, $client->getResponse()->getStatusCode());
    }

    /**
     * @group functional
     * @dataProvider createRequesterDataProvider
     */
    public function testFailCreateActionWithRequesterLogIn(array $requestContent): void
    {
        $client = static::createClient();

        $this->logInRequester($client);

        $client->request('POST', '/requester', [], [], [], json_encode($requestContent));

        $this->assertEquals(403, $client->getResponse()->getStatusCode());
    }

    /**
     * @group functional
     * @dataProvider createRequesterDataProvider
     */
    public function testFailCreateActionWithUserLogIn(array $requestContent): void
    {
        $client = static::createClient();

        $this->logInUser($client);

        $client->request('POST', '/requester', [], [], [], json_encode($requestContent));

        $this->assertEquals(403, $client->getResponse()->getStatusCode());
    }

    /**
     * @group functional
     * @dataProvider createRequesterDataProvider
     */
    public function testFailCreateActionWithoutLogIn(array $requestContent): void
    {
        $client = static::createClient();

        $client->request('POST', '/requester', [], [], [], json_encode($requestContent));

        $this->assertEquals(401, $client->getResponse()->getStatusCode());
    }
}

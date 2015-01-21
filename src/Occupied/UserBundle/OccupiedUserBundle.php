<?php

namespace Occupied\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class OccupiedUserBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}

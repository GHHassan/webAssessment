<?php
/**
 * autoloader class
 * 
 * this class is responsible for including all the classes in the api folder
 * when they are needed.
 * 
 * this class is called in the index.php file
 * 
 * @author  G H Hassani <W20017074@northumbria.ac.uk>
 */

class autoloader
{
    public function __construct()
    {
        $this->register();
    }

    public static function autoload($class)
    {
        $class = strtolower($class);
        $path = '../api/src/' . $class . '.php';
        if (file_exists($path)) {
            include_once $path;
        }
    }

    public static function register()
    {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }
}
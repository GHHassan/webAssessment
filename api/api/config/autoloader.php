<?php
/**
 * autoloader class
 * 
 * this class is responsible to include all the classes 
 * in the api folder as and when they are needed.
 * this class's methods are called in the api.php file only once.
 * it assumes that all the classes are in the src folder 
 * and the files are named the same as the class name.
 * Abstract constructor makes sure that the class is not
 * instantiated.
 * 
 * @author  G H Hassani <W20017074@northumbria.ac.uk>
 */

 class Autoloader
{
    public static function autoload($class)
    {
        $class = strtolower($class);
        $path = './src/' . $class . '.php';
        if (file_exists($path)) {
            include_once $path;
        }
    }

    public static function register()
    {
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }
}

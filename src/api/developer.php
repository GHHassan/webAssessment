<?php

class Developer {
    private $fullname;
    private $studentID;
    private $data;
    public function __construct(){
        $this->fullname = "Ghulam Hassan Hassani";
        $this->studentID = "W20017074";

        $this->setData(array(
            "Fullname"=> $this->getFullname(),
            "StudentID"=>$this->getStudentID()
        ));
    }

    public function getFullname(){
        return $this->fullname;
    }
    public function setFullname($fullname){
        $this->fullname = $fullname;
    }
    public function getStudentID(){
        return $this->studentID;
    }
    public function setStudentID($studentID){
        $this->studentID = $studentID;
    }

    public function setData($data){
        $this->data = $data;
    }
    public function getData(){
        return $this->data;
    }
}
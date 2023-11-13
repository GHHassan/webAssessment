<?php
/**
 * authors and their affiliation
 * 
 * This endpoint should return the country, 
 * city and institution each author is affiliated
 *  with for each publication they are associated
 *  with. For each of these affiliations the author id,
 *  author name, content id and content name 
 * should also be returned. Note that authors can 
 * have more than one affiliation for each item 
 * of content and that authors can have different 
 * affiliations on different items of content. 
 * Therefore, authors may have multiple 
 * records returned by this endpoint.
 * 
 * @author H Hassani <w20017074>
 * 
 * @param 1. content ( example: author-and-affiliation?content=99140 ).
 *  Where a content id is specified the response should just
 *  contain details for authors of that content.
 * 2. country (example: author-and-affiliation?country=japan ).
 *  This should return only the details where there is affiliation 
 * with the specified country. Attempting to use both parameters 
 * together should not be supported and result in an error 
 * message being returned. $name
 */

/** 
 * data from affiliation = country, city, inistitution, 
 * author_id, author_name, content_id, content_name, 
 * 
 */

 class Authorandaffiliation extends Endpoint
 {
    public function __construct(){
        parent::__construct();
        $this->initialiseSQL();

    }

    public function initialiseSQL(){
        $sql = 'SELECT DISTINCT country, city, institution, author_id, author_name, content_id, content_name FROM affiliation';
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
 }
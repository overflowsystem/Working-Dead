#pragma strict

public var speed : float = 10;
public var jumpSpeed : float = 10;
private var moveDirection : Vector3 = Vector3.zero;
private var gravity : Vector3 = Vector3.zero;
public var camPan : Transform;
public var camTilt : Transform;
public var cam : Transform;
public var camSpeed : float = 2.00; //speed rotazione camera
private var controller : CharacterController;

private var jumping : boolean = false;

function Start () {
	controller = transform.GetComponent(CharacterController);
}

function Update () {
	
	moveDirection = Input.GetAxis("Vertical")* cam.transform.forward.normalized + Input.GetAxis("Horizontal") * cam.transform.right.normalized;
	moveDirection.y = 0;
	//if(moveDirection != Vector3.zero){
	//		character.rotation.eulerAngles = Vector3(0, Quaternion.LookRotation(moveDirection).eulerAngles.y, 0);
	//}
	
	
	
	
	moveDirection = Vector3.Normalize(moveDirection);
		
	moveDirection *= speed;
	
	if(!controller.isGrounded){
		gravity += (Physics.gravity*Time.deltaTime)*5;
	} else {
		
		if(Input.GetButtonDown("Jump")){
			jumping = true;
		}
		
		gravity.y = -controller.stepOffset*Time.deltaTime;
		
		if(jumping){
			gravity.y = jumpSpeed*2;
			jumping = false;
		}
		
		jumping = false;
		
	}
	
	moveDirection += gravity;
	
	controller.Move(moveDirection*Time.deltaTime);
	
    //rotazione camera
  	this.transform.Rotate(0, camSpeed * Input.GetAxis ("Mouse X"), 0);
	
}
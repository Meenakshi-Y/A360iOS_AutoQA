﻿//USEUNIT Hashtable


var obj= null  //Nullifying object used for test object before every function execution
var childobj


//********************************************

//Function for launchin the app
function LaunchApp()
{
  var currentDev = Aliases.Device.DeviceName
  Mobile.SetCurrent(currentDev);    
  TestedApps.Items(0).Run(); //..It will run first item from tested app if we just keep one itme we would not require to hardcode build name
  Delay(10000);    
  Aliases.Device.processQaA36020.ConfirmDownloadPopup.Frame.Grid.Grid.ConfirmButton.Click()
  }
  
  
//*******************************************************

//Function to login
function login(User,Pass)
{
  var process = Aliases.Device.processQaA36020
  var ScrollV = process.LoginPage.StackLayout.ScrollView
  
//  ScrollV.Frame.Grid.Frame2.StackLayout.signInStack.userName.Keys(Project.Variables.UserName)
//  ScrollV.Frame.Grid.Frame2.StackLayout.signInStack.password.Keys(Project.Variables.Password) 
   var x = Project.Variables.VariableByName(User)
    var y = Project.Variables.VariableByName(Pass)
   ScrollV.Frame.signInStack.userName.SetText(x)
   ScrollV.Frame.signInStack.password.SetText(y)   

  ScrollV.Frame.signInStack.Click()
  ScrollV.Frame.signInStack.signinBtn.Click()
  ScrollV.Frame.signInStack.signinBtn.Click()
  Delay(20000)
//  try{
//   var Waitobj=Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.StackLayout.Grid1.StackLayoutHam.menuButton
//  while (Waitobj.Exists!= true )
//   {
//  Delay(6000,"Delaying execution for Synchronizing TC with  A360 app")
//  }
//    }
//  catch(e)
//  {Log.Error(e.message);}
  
  //Check for No match found popup  
  var ocr = OCR.Recognize(Mobile.Device("*").Desktop);
  ocr.BlockByText("Ok").Touch(); 
  ocr.BlockByText("Ok").Touch();     

}        

//************************************

//Function for checking and changing location if required
function Location(InData){
  
  var process = Aliases.Device.processQaA36020
  var CurrentLoc=process.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.searchlocationLabel.XFControlText
  if (CurrentLoc !== InData)
  {
      
    process.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.searchlocationLabel.Touch()
    process.SearchCityPage.searchEntry.Keys(InData)
    Delay(5000);
    process.SearchCityPage.lvSearchResult.TouchItem(1)
    Delay(10000)
  }
    
}



//*************************************************************

//Function for click
function ClickAction(TestObj)
{
 // var obj = eval(TestObj)
  Delay(1000)
  if (obj.Exists ==true )
    {
      obj.Click();
    }
  else
    {
      Log.Error(TestObj+" not found or it is not displayed on screen")
    }    
}
//*******************************************************

//Function for entering value in the field
function InputAction(TestObj,InData)
{
  //var obj = eval(TestObj)
  //Delay(1000)
  if (obj.Exists ==true )
   {
    obj.SetText(InData);
   }
  else
   {
    Log.Error(TestObj+" not found or it is not displayed on screen")
   }  
}

//********************************************************

//Function for WAIT
function WaitAction(TestObj)
{
  //var obj = eval(TestObj) 
  try{
      var StopWatch;
      StopWatch = HISUtils.StopWatch;
      StopWatch.Start()
      while (obj.Exists!= true && obj.VisibleOnScreen!= true ){
        //Delay(5000,"Waiting for the Test Object")
       
         Delay(5000,"Waiting for the Test Object")
         if (StopWatchObj.Split()>=300000){
           StopWatch.Stop()
           Log.Message ("Wait timeout reached")
           break;
       }
    
      }
     }
  catch(e)
  {Log.Error(e.message);}
}


//****************************************************************************

//Function for Touch
function TouchAction(TestObj,X,Y)
{
  //var obj = eval(TestObj)
  Delay(1000)
  if (obj.Exists ==true )
    {
      obj.Touch(X,Y);
    }
  else
    {
      Log.Error(TestObj+" not found or it is not displayed on screen")
    }    
}
  

//*******************************************************
//Function for TouchItem
function TouchItemAction(TestObj,InData)
{
  //var obj = eval(TestObj)
  Delay(1000)
  if (obj.Exists ==true )
    {
      obj.TouchItem(InData);
    }
  else
    {
      Log.Error(TestObj+" not found or it is not displayed on screen")
    }    
}
//***************************************************
function KBInput(TestObj,InData)
{
  //var obj = eval(TestObj)
  Delay(1000)
  if (obj.Exists ==true )
    {
      obj.Keys(InData);
    }
  else
    {
      Log.Error(TestObj+" not found or it is not displayed on screen")
    }    
  
}


//*******************************************************



//Function for Checkpoint only

function Checkpoint(ExpResult,ActValue,TC_ID,Message,Mod)
{
  //Checkpoint
   var Checkpoint= (aqConvert.VarToStr(ExpResult)=== aqConvert.VarToStr(ActValue))? "Passed": "Failed";    
  if (Checkpoint == "Passed"){
   Log.Checkpoint(Checkpoint+" : "+Mod+" - "+TC_ID+" : "+Message);  
   }
   else 
   {
   Log.Checkpoint(Checkpoint+" : "+Mod+" - "+TC_ID+" : validation has failed")
   }   
}
//****************************************************************

//Function for checkpoint where object's existance needs to be verified

function ValidateActValueObj(TestObj)
{
  ActValue=null
  var obj = eval(TestObj)
      
  if (obj.Exists ==true )
   {
    ActValue = "true"
   }
  else
   {
    ActValue = "false"
   }   
  
  return ActValue; 
} 

//****************************************************************

//Function for checkpoint where object's property value needs to be verified

function ValidateActValueProp(TestObj,PropVal1)
{
  ActValue=null;
  var obj = eval(TestObj)      
  if (obj == PropVal1 )
  {
    ActValue = true
  }
  else
  {
    ActValue = false
  }   
  return ActValue;  
}
//************************************************************************

//Function for checkpoint where substring needs to be verified

function ValidateActValueString(TestObj,InData)
{
   ActValue=null
   obj = eval(TestObj)
   var InputString = obj.XFControlText
   var Res = aqString.Find(InputString, InData,0,false)
   if (Res !== -1)
     {
      ActValue = true
     }
   else
    {
      ActValue = false
    } 
    return ActValue;   
}

//**********************************************************************************


//Function for finding object and clicking on it
function FindObjClickAction(TestObj,Prop1,PropVal1,Prop2,PropVal2,TC_ID,Mod)
{
  var obj = eval(TestObj)
      
  if (obj.Exists ==true )
  {
   var obj1=obj.FindChild([Prop1,Prop2],[PropVal1,PropVal2],10); 
   Delay(10000)            
   if(obj1.Exists==true)
    {
    obj1.click();
    } 
    else
    {
      Log.Message(Mod+" - "+TC_ID+" : Action could not be perfromed as a Child of "+TestObj+" not found")
    }
  }
  else
  {
  Log.Message(Mod+" - "+TC_ID+"-"+TestObj+" not found or it is not displayed on screen")  
  }    
   
}

//*********************************************

//function for Finding an object

function FindObj(TestObj,Prop1,PropVal1,Prop2,PropVal2,TC_ID,Mod)
{
  var obj = eval(TestObj)
      
  if (obj.Exists == true )
  {
   var obj1=obj.FindChild([Prop1,Prop2],[PropVal1,PropVal2],10); 
   Delay(10000)            
   if(obj1.Exists==true)
    {
    Log.Message(Mod+" - "+TC_ID+" : Child object of "+TestObj+" found")    
    return obj1;
    } 
    else
    {
      Log.Message(Mod+" - "+TC_ID+" :Child object of "+TestObj+" not found")
    }
  }
  else
  {
  Log.Message(Mod+" - "+TC_ID+"-"+TestObj+" not found or it is not displayed on screen")  
  }    
}

//******************************************************************

//Function for clicking on child object

function ChildClick(TestObj,Prop1,PropVal1,Prop2,PropVal2,TC_ID,Mod)
{
  childobj= FindObj(TestObj,Prop1,PropVal1,Prop2,PropVal2,TC_ID,Mod);
  Delay(5000)
  childobj.click()  
}

//*****************************************************************

//Function for KW DELAY
function DelayAction(Tms)
{ 
  var Str = "Delaying test run for " + Tms + "milliseconds.";
  aqUtils.Delay (Tms,Str);
}

//*********************************************************************

//Function for KW SCROLL
function ScrollAction(TestObj,InData)
{
  var obj = eval(TestObj)
      
  if (obj.Exists ==true )
  {
   obj.Drag(obj.X,obj.Y,-1,(InData),20)
   Delay(1000)
  }
  else
  {
    Log.Error(TestObj+" not found or it is not displayed on screen")
  }   
}

//********************************************************************

function DragAction(TestObj,InData,DragX,DragY)
{
  var obj = eval(TestObj)
      
  if (obj.Exists ==true )
  {
  obj.wPosition = InData;
   obj.Drag(obj.X,obj.Y,(DragX),(DragY),20)
   Delay(1000)
  }
  else
  {
    Log.Error(TestObj+" not found or it is not displayed on screen")
  }   
}
//***************************************************

function DragListObj(TestObj,ClientX,ClientY,toX,toY){
  // syntax of methos=d.....TestObj.Drag(ClientX, ClientY, toX, toY, Shift)
  
  var obj = eval(TestObj)
      
  if (obj.Exists ==true )
  {  
   obj.Drag(ClientX,ClientY,toX,toY)
   Delay(1000)
  }
  else
  {
    Log.Error(TestObj+" not found or it is not displayed on screen")
  }   

}



//*********************************************

//KW for  Zoom in
//function ZoomIn()
//{
//  var obj = eval(TestObj)
//      
//  if (obj.Exists ==true )
//  {
//   //obj.zzoomIn()
//Aliases.Device.processQaA36020.NavigationPage.AccountMapView.StackLayout.AbsoluteLayout.customMap.VisibleRegion.WithZoom(10)
 //Aliases.Device.processQaA36020.NavigationPage.AccountMapView.StackLayout.AbsoluteLayout.customMap.MoveToRegion(8046.72000054802);
 //var x= Aliases.Device.processQaA36020.NavigationPage.AccountMapView.StackLayout.AbsoluteLayout.customMap.VisibleRegion.Radius.Meters
// Aliases.Device.processQaA36020.NavigationPage.AccountMapView.StackLayout.AbsoluteLayout.customMap.SetVisibleRegion(9000)
 //Delay(1000)
//  }
//  else 
//   {
//    Log.Error(TestObj+" not found or it is not displayed on screen")
//  }   
//}

//************************************************************

////KW for  Zoom Out
//function ZoomOut(TestObj)
//{
//  var obj = eval(TestObj)
//      
//  if (obj.Exists ==true )
//  {
//   obj.zzoomOut()
//  }
//  else
//  {
//    Log.Error(TestObj+" not found or it is not displayed on screen")
//  }   
//}

//****************************************************************

//function ValidateZoomIn(TestObj)
//{  
//  ActValue=null
//  obj=eval(TestObj)      
//  if (obj.Exists ==true )
//  {
//    //Check default Zoom level
//   var ZValInitial=obj.zzoomLevel       
//    
//     // check zoom value after zoom in 
//    ZoomIn(obj);
//    Delay(5000)
//    var ZValZoomin = obj.zzoomLevel
//              
//        if (ZValZoomin>ZValInitial)
//            {
//              Log.Message("Zoom In action was performed")
//              ActValue = true
//            }
//        else
//           { 
//            Log.Message("Zoom In action was not performed")
//            ActValue = false
//           }       
//    }
//  else  
//    {
//      Log.Error(TestObj+" does not exist in application")
//    }  
//  
//}


//*************************************************************

//Function to validate Zoom out
//function ValidateZoomOut(TestObj)
//{
//  ActValue=null
//  obj=eval(TestObj)      
//  if (obj.Exists ==true )
//  {
//      //Check default Zoom level
//      var ZValInitial=obj.zzoomLevel  
//    
//    // check zoom value after zoom in
//      ZoomIn(obj); 
//      Delay(5000)                          
//      var ZValZoomin = obj.zzoomLevel
//              
//    // check zoom value after zoom out 
//      ZoomOut(obj)
//      Delay(5000)
//      var ZValZoomOut = obj.zzoomLevel               
//              
//        if (ZValZoomOut<ZValZoomin)
//            {
//              Log.Message("Zoom Out action was performed")
//              ActValue = true
//            }
//         else
//           { 
//            Log.Message("Zoom Out action was not performed")
//            ActValue = false
//           }  
//    }   
//   else  
//        {
//          Log.Error(TestObj+" does not exist in application")
//        }  
//  
//}

//**********************************************************
  //Function for KW GET_NOOFACC
function GetNoOfAcc(TestObj)
 {
  var obj = eval(TestObj)
  var AccString=obj.XFControlText          
  var split1 = AccString.split("/");
  var split2 = split1[1].split(" ");
  var  AccNo = aqConvert.StrToInt(split2[0])
  return AccNo;
 }

//*************************************************************

//Code for comparing Account no. on All, Onpremise and OffPremise tab

function Validate_AccNo_Tabs(TestObj)
{  
  ActValue = null;
  //Get no. of accounts on All Tab
   var AccValAll= GetNoOfAcc(TestObj) 
   
   ////Get no. of accounts on OnPremise Tab
   Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.StackLayout.Grid.StackLayout2.OnPremiseLabel.Click()   
   Delay(5000);
   var AccValOnPre= GetNoOfAcc(TestObj)
   
   //Get no. of Accounts on offPremise tab
   Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.StackLayout.Grid.StackLayout3.OffPremiseLabel.Click()
   Delay(5000);
   var AccValOffPre= GetNoOfAcc(TestObj)
   
   if (AccValAll==AccValOnPre+AccValOffPre)
     {
      ActValue = true 
      Log.Message("No.of accounts in All tab is equal to sum of no. of accounts in OnPremise and OffPremise tabs")
     }
   else
     {
       ActValue = false
       Log.Message("No.of accounts in All tab is not equal to sum of no. of accounts in OnPremise and OffPremise tabs")
     }   
}

//************************************************************************

function AssignValToVar(TestObj,VariableName)
{
  VariableName=null
  var obj = eval(TestObj)
       
  if (obj.Exists ==true )
  {
   obj=VariableName;
  }
  else
  {
    Log.Error(TestObj+" not found or it is not displayed on screen")
  } 
      
}

//*****************************************
function comparenum(var1,var2,Key)
{   
  ActValue=null
  switch(Key)
     {
        case "GREATER":            
              if (var1>var2){ActValue= true}
              else {ActValue=false}          
        break;      
                  
        case "SMALLER": 
          if (var1>var2){ActValue= true}
          else {ActValue=false} 
        break;
        
        case "EQUAL": 
          if (var1==var2){ActValue= true}
          else {ActValue=false} 
        break;
        
        case "GREATEROREQUAL":
          if (var1>=var2){ActValue= true}
          else {ActValue=false}          
          break;  
           
        case "LESSEROREQUAL":
          if (var1<=var2){ActValue= true}
          else {ActValue=false}          
          break;  
 
     }
  
}

//***************************************

function CompAcc_DistanceChange(TestObj)
{  

  ActValue = null;
  //Get no. of accounts at 200 mi distance
   var DefaultAccNo= GetNoOfAcc(TestObj) 
   
  //Click on advance filter
  Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.StackLayout.Grid1.StackLayoutLoc.openFilter.Click();

  //drag the slider
  let slider = Aliases.Device.processQaA36020.AdvanceFilterPopup.StackLayout.sv.StackLayout.Grid4.StackLayout.StackLayout.distanceSlider;
  slider.wPosition = 116;
  slider.Drag(210, 14, -79, 1);
  
  //Click on Save 
  Aliases.Device.processQaA36020.AdvanceFilterPopup.StackLayout.StackLayout.btnSave.Click()
  Delay(10000)

  //calulate acc no.again
   var AccNoDistanceChange = GetNoOfAcc(TestObj)
   
   //Compare the acc no. change
   if (AccNoDistanceChange<DefaultAccNo){ActValue= true}
   else {ActValue=false}    

  
}
//*******************************


//**********************************************************
  //Function for KW GET_OBJCOUNT
function GetObjectiveCount(Obj)
 {
  var obj = eval(Obj)
  var ObjString=obj.XFControlText       
  var split1 = ObjString.split(" ");
  return aqConvert.StrToInt(split1[0]);
 }

//*************************************************************

function VerifyPopUpText(InData)
{  
  ActValue=null;
  var ocr = OCR.Recognize(Mobile.Device("*").Desktop);
  var str = ocr.FullText
  Delay(2000)
  
  InData=aqString.Trim(InData,3)
 var newStr = InData.replace("\\n","\n");  
  var Res = aqString.Find(str,newStr,0,false)
  if ( Res != -1)
    {ActValue= true}
  else 
    {ActValue=false}      
  Delay(1000)

}

//******************************************************************

function TouchPopUp(InData)
{
  var ocr = OCR.Recognize(Mobile.Device("*").Desktop);
  ocr.BlockByText(InData,spBottomMost).Touch(); 
}

//****************************************

function TouchItemTable(TestObj,X,Y)
{
  
  var obj = eval(TestObj)
       
  if (obj.Exists ==true )
  {
   obj.TouchItem(X,Y)
  }
  else
  {
    Log.Error(TestObj+" not found or it is not displayed on screen")
  } 
//  Aliases.Device.processQaA36020.window.pickerview0.TableView(0)
//  var ocr = OCR.Recognize(Mobile.Device("*").Desktop);
//  //ocr.BlockByText("BTG").Touch(); 
//  ocr.BlockByText("Done").Touch(); 
  
}

//*********************

function setdatePicker(TestObj,InData)
{
  var obj = eval(TestObj)
       
  if (obj.Exists ==true )
  {
   //obj.wDate = aqConvert.StrToDate(InData)
     obj.wDate = InData
     //obj.wDate = aqDateTime.SetDateElements(InData)
  }
  else
  {
    Log.Error(TestObj+" not found or it is not displayed on screen")
  } 

}

//*************************

//Function for entering data in fields of ListView object

function InputListObj(TestObj,Prop1,InData)
{
    var obj = eval(TestObj)
    
    if (obj != null)
  {    
  obj[Prop1] = InData 
  } 
  else
  {
    Log.Error(TestObj+" not found or it is not displayed on screen")
  }    

}

//********************************8
function CalulateLinkedAcc(TestObj)
{
  var obj = eval(TestObj)
  var LinkedAccString=obj.XFControlText          
  var split1 = LinkedAccString.split(":");
  var  LinkedAccCount = aqConvert.StrToInt(split1[1])
  return LinkedAccCount;
  
}

//******************************************************

function ResetToBase(TestObj)
{     
  try{
  var obj = eval(TestObj)
    
  if (obj != null)
  {
     var obj = eval(TestObj)
     var MapName = obj.MappedName
     var splitobj = MapName.split(".")
     var currentPage =  splitobj[3];
       if (currentPage === "NavigationPage")
       {
         currentPage= splitobj[6]
       }
     var A360 = Aliases.Device.processQaA36020

     switch(currentPage)
        {
            case "AccountDetailPage":  
            A360.AccountDetailPage.StackLayout.CommonHeader.StackLayoutCommonHeader.GridHeaderTop.StackLayoutBackBtn.BackBtnAccDetail.Click()        
            Delay(10000) 
            break; 
        
        
            case "AccountObjectivePage": 
            A360.AccountObjectivePage.StackLayout.CommonHeader.StackLayout.Grid2.StackLayout2.ObjectivesBackButton.Click()           
            Delay(10000) 
            break;
        
        
            case "AccountSurveyPage":
            A360.AccountSurveyPage.StackLayout.CommonHeader.StackLayout.Grid2.StackLayout2.BackButton.Click()           
            Delay(10000)  
            break;
        
        
            case "AccountDocumentPage":            
             A360.AccountDocumentPage.StackLayout.CommonHeader.StackLayout.Grid2.StackLayout2.BackButton.Click() 
            Delay(10000)
            break;
        
        
            case "AccountPhotoPage": 
            A360.AccountPhotoPage.StackLayout.CommonHeader.StackLayout.Grid2.StackLayout2.BackButton.Click()
            Delay(10000)
            break;                       
               
            case "AccountNotePage":            
            A360.AccountNotePage.StackLayout.CommonHeader.StackLayout.Grid2.StackLayout.BackButton.Click() 
            Delay(10000)
            break;
        
        
            case "ManageObjectivePage":
            A360.NavigationPage.MasterDrawerPage.NavigationPage.ManageObjectivePage.StackLayout.Grid.StackLayout.MenuButton.Click()            
            A360.NavigationPage.MasterDrawerPage.masterPage.ScrollView.StackLayout.StackLayout.StackLayout2.lvMenuList.TouchItem(1)  
            Delay(10000)   
            break;
        
        
            case "ManageDocumentPage": 
            A360.NavigationPage.MasterDrawerPage.NavigationPage.ManageDocumentPage.StackLayout.Grid2.StackLayout.btnMenu.Click()           
            A360.NavigationPage.MasterDrawerPage.masterPage.ScrollView.StackLayout.StackLayout.StackLayout2.lvMenuList.TouchItem(1)  
            Delay(10000)   
            break;
        
        
            case "ManageTargetListPage": 
            A360.NavigationPage.MasterDrawerPage.NavigationPage.ManageTargetListPage.StackLayout.Grid2.StackLayout.ButtonMenu.Click()           
            A360.NavigationPage.MasterDrawerPage.masterPage.ScrollView.StackLayout.StackLayout.StackLayout2.lvMenuList.TouchItem(1)  
            Delay(10000)   
            break;
        
       
            case "PhotoRecapPage": 
        
            A360.NavigationPage.MasterDrawerPage.NavigationPage.PhotoRecapPage.StackLayout.Grid.StackLayout.btnMenu.Click()           
            A360.NavigationPage.MasterDrawerPage.masterPage.ScrollView.StackLayout.StackLayout.StackLayout2.lvMenuList.TouchItem(1)  
            Delay(10000)  
            break;
        
        
            case "CocktailRecipe": 
            A360.NavigationPage.MasterDrawerPage.NavigationPage.CocktailRecipe.Grid.Grid.btnMenu.Click()
            A360.NavigationPage.MasterDrawerPage.masterPage.ScrollView.StackLayout.StackLayout.StackLayout2.lvMenuList.TouchItem(1)  
            Delay(10000)        
          
            break;
        
        
            case "AccountPage":                    
          
            break;
        
            case "AddObjectivePopup":            
            A360.AddObjectivePopup.Frame.AbsoluteLayout.StackLayout.Frame.Grid.btnClosePopup.Click()
            A360.AccountObjectivePage.StackLayout.CommonHeader.StackLayout.Grid2.StackLayout2.ObjectivesBackButton.Click()           
            Delay(10000) 
            break;
            
            case "AddTargetListPopup":            
            A360.AddTargetListPopup.Frame.Grid.Frame.Grid.closepopupBtn.Click()
            A360.AccountObjectivePage.StackLayout.CommonHeader.StackLayout.Grid2.StackLayout2.ObjectivesBackButton.Click()           
            A360.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.StackLayout.filterStrip.crossButton.Click()
            Delay(10000) 
            break; 
            
             
            case "AddMoreAccountsPage":            
            A360.AddMoreAccountsPage.StackLayout.Grid.StackLayout2.backBtn.Click()
            Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.Touch(30, 38)
            A360.NavigationPage.MasterDrawerPage.masterPage.ScrollView.StackLayout.StackLayout.StackLayout2.lvMenuList.TouchItem(1)           
            Delay(10000) 
            break; 
          } 
          
          
   //Reseting Filter
    Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.StackLayout.Grid1.StackLayoutLoc.openFilter.Click()
    Aliases.Device.processQaA36020.AdvanceFilterPopup.StackLayout.StackLayout.btnReset.Click()
    Delay(10000);
    
    //Reseting  Search
    Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.StackLayout.Grid1.StackLayoutLoc.openSearch.Click()
    Aliases.Device.processQaA36020.SearchWithFilters.StackLayout.Grid.crossBtn.Click()
    Aliases.Device.processQaA36020.SearchWithFilters.StackLayout.Grid.btnBack.Click()
    Delay(10000);
    
    Log.Message("An attempt was made to reset to base")
    }     
    
     
   else
      {  
        
      ResetWithCord()
  
      }   //end of else  
      
   } //end of try  
      
  
      catch(e)      
      
      {  
        Log.Error(e.message); 
        ResetWithCord()
        
        
      
      }      
      
    

}

//function Test()
//{
//  TestObj = Aliases.Device.processQaA36020.AddMoreAccountsPage.StackLayout.AbsoluteLayout.sfListView.ExtendedScrollView.VisualContainer.ListViewItem.Grid.SelectAccRadioBtn
//  
//  ResetToBase(TestObj);
//}

function ResetWithCord()
  {  
    //Closing if there is a popup
      var ocr = OCR.Recognize(Mobile.Device("*").Desktop);
      ocr.BlockByText("Ok").Touch();       
      Delay(5000)  
 
      //Clicking on Menu button or back button
      Aliases.Device.Touch(30, 40)
      Delay(2000)
      
      //clicking on Accounts in menu panel
      Aliases.Device.Touch(68, 260)
      Delay(2000)  
      
      //Reseting Filter
    Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.openFilter.Click()
    Aliases.Device.processQaA36020.AdvanceFilterPopup.GridAdvanceFilter.btnReset.Click()
    Delay(10000);
    
    //Reseting  Search
    Aliases.Device.processQaA36020.NavigationPage.MasterDrawerPage.NavigationPage.AccountPage.openSearch.Click()
    Aliases.Device.processQaA36020.SearchWithFilters.crossBtn.Click()
    Aliases.Device.processQaA36020.SearchWithFilters.btnBack.Click()
    Delay(10000);
    
    Log.Message("An attempt was made to reset to base")   
    
  
  }       
  
  //**********************************************************
  
  function getCurrnetLocation(){
   var lat=Aliases.Device.GPS.Location.Latitude
   var lng=Aliases.Device.GPS.Location.Longitude

   var address = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyDuZDd_4Q4UxdfjPajkDk8F6hbnIjuYiZU";

  // Create an aqHttpRequest object
  var aqHttpRequest = aqHttp.CreateGetRequest(address);

  // Send the request, get an aqHttpResponse object
  var aqHttpResponse = aqHttpRequest.Send();    
 
  //Extracting add from string
  var text = aqHttpResponse.Text // A response body 
  var splitText = text.split("formatted_address")
  var addStr =  splitText[1].split(":")
  var add = addStr[1].split("  ")   
  var CurrentAdd = aqString.SubString(add[0], 0,add[0].length-2)
  Log.Message(CurrentAdd)
  return CurrentAdd   
} 

//*********************************************************************************

//Function to select date from preplan calender
function Date_PrePlanCal(TestObj,InData)
{
    var obj = eval(TestObj)
    
    if (obj != null){    
      obj.MoveToDate = InData 
      Delay(5000) 
      var SplitDate = InData.split("/")
      var date = SplitDate[1] 
      OCR.Recognize(obj).BlockByText(date).Touch();
      } 
    else{ 
      Log.Error(TestObj+" not found or it is not displayed on screen")
      }   

}

//********************************************************************************

function Counter(TestObj){ 
  cnt=null;
           
    var obj = eval(TestObj)
    
    if (obj != null){ 
      Project.Variables.cnt = obj.Count
      return cnt;
      } 
    else{ 
      Log.Error(TestObj+" not found or it is not displayed on screen")
      }       
}
                                                                                                                                                                                   
function ValidateActValuePropForLoop(TestObj,Cnt,PropVal1){ 
    var obj = eval(TestObj)       
    if (obj != null){ 
     var splitObj = TestObj.split("Item")
     var firstobj= aqString.SubString(splitObj[0],0,splitObj[0].length-1)
     var secondobj = aqString.SubString(splitObj[1],4,splitObj[1].length)    
     
     for (i=0;i<=Cnt-1;i++){ 
       
       var FinalObj= firstobj+".Item("+i+")."+secondobj
         var obj1 = eval(FinalObj)         
        if (obj1==PropVal1 ){
            ActValue = true
            break;
          }
          else{                          
            ActValue = false
          }       
        
      }     //ending for 
      return ActValue;
   
   }   //ending 
  

  
}

//********************************************************************



  //************************************************************
  //*************************************************************
  //**************************************************************
function LoginPOSTReq(){
  
var XmlHttpRequest;
XmlHttpRequest = null;

XmlHttpRequest = getActiveXObject("MSXML2.XMLHTTP.3.0");

// XmlHttpRequest.open( Method, URL, Asynchronous, UserName, Password)

// method e.g. GET, POST, HEAD, PUT, DELETE, OPTIONS...

// Asynchronous = true, do not wait on a server response, false, pause current execution utnil the request is complete

XmlHttpRequest.open("POST", "http://qa2.a360api.droisys.info/api/CoreUser/A360CognitoLogin", false);

// Name, Value

XmlHttpRequest.setRequestHeader("Content-Type", "application/json");
XmlHttpRequest.setRequestHeader("AppToken", "KvNfb8xk0pFPFWk2KKWstsAWuK7vwuGH");
XmlHttpRequest.setRequestHeader("AppID", "zNiphaJww8e4qYEwJ96gVK5HTAAbAXdj");
XmlHttpRequest.setRequestHeader("OAuth", "jSzcOZo9rry6DOpLGS0TEzrTQswNVWku");

var formData = '{"UserName": "admenum","Password":"Pass360","DeviceID":"1","DeviceType":"1"}'

XmlHttpRequest.send(formData);

try {

Log.Message("http_request: reply in additional info", XmlHttpRequest.responseText);

XmlHttpRequest.responseText;

}

catch (e) {

"Error" + e ;

}
}

//*****************************************************************************************************************************************
//***************************************************************************************************************************************
//*****************************************************************************************************************************

function readExcelDataIntoProjectVariable(excelFileName,excelQuery,projectVariableName){
    var projVariable = getProjectVaraiableTable(projectVariableName);
    var objRecordSet = getRecordSet(excelFileName,excelQuery);
    
    //Add columns
    addProjVarColumns(objRecordSet,projVariable);
    processRecordSet(objRecordSet,projVariable,excelFileName,excelQuery);
}
function getProjectVaraiableTable(name){
    //remove the variable if it is exists already
    if(Project.Variables.VariableExists(name)) Project.Variables.RemoveVariable(name);
    Project.Variables.AddVariable(name,"Table");
    return Project.Variables.VariableByName(name);
}

function isTestComplete64Bit(){
    if(Sys.Process("Test*te").WaitProperty("Exists",true)){
        return aqString.Compare(Sys.Process("Test*te").ProcessType,"x64",false) == 0;
    }
}

function getConnectionString(excelFileName){
    var ctExcelProvider64 = "Microsoft.ACE.OLEDB.12.0",
        ctExcelProvider32 = "Microsoft.Jet.OLEDB.4.0";
    return "Provider=" + (isTestComplete64Bit() ? ctExcelProvider64 : ctExcelProvider32) + ";Data Source = " + excelFileName + ";Persist Security Info=False;Extended Properties=Excel 8.0;";
}

function getRecordSet(excelFileName,excelQuery){
    var excelConnection = getActiveXObject("ADODB.Connection");
    var str_Connection = getConnectionString(excelFileName);
    excelConnection.Open(str_Connection);//Open the connection to excel object
    var excel_recordSet = getActiveXObject("ADODB.Recordset");
    //Query the excel using the sql query and connection object
    excel_recordSet.Open(excelQuery, excelConnection);   
    return excel_recordSet;
    excelConnection.Close()  ///closing the ADODB connection
}

function processRecordSet(objRecordSet,projVariable,excelFileName,excelQuery){
    var processedRows = 0;
    var curRow = -1;
	try{
        if (!objRecordSet.bof) {
            objRecordSet.MoveFirst();
            while (!objRecordSet.eof) {
                try {
                    curRow = projVariable.RowCount;
                    projVariable.RowCount = curRow + 1;

                    for (var f = 0; f < objRecordSet.fields.Count; f++) {
                        projVariable.$set("Item", f, curRow, aqConvert.VarToStr(objRecordSet.fields.Item(f)));
                    }
                    processedRows++;
                } catch (ex) {
                    Log.Error("Error while adding items into project variable table");
                }
                objRecordSet.MoveNext();
            }
        }
        objRecordSet.Close();
    } catch (ex) {
        Log.Error("Error occured while setting excel data , Error Description: " + ex.stack);
    } finally {
        Log.Message("Excel query completed and project variable updated","Processed rows: " + processedRows + "\nExecuted query: " + excelQuery + "\nExcel file name: " + 
    	excelFileName);
    }    
}

function addProjVarColumns(objRecordSet,projVariable){
	if (objRecordSet != null && !objRecordSet.bof) {
        objRecordSet.MoveFirst();
		var cCounter = 0;
        try {
            for (var f = 0; f < objRecordSet.fields.Count; f++) {
                projVariable.AddColumn(aqConvert.VarToStr(objRecordSet.fields.Item(f).Name));
				cCounter++;
            }                
            Log.Message("Added columns to project variable","Processed columns: " + cCounter);
        } catch (ex) {
            Log.Error("Error while adding columns into project variable");
        }
    }	
}

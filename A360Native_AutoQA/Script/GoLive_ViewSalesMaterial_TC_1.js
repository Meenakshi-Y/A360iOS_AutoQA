//USEUNIT CommonFunctionLib
//USEUNIT Hashtable

function GoLive_ViewSalesMaterial_TC_1()
{    
   
    var ExcelPath_TestDataSheet
       
        //To get Module name
        var Mod_Name = "Go Live"
        var TestCase_ID = "GoLive_ViewSalesMaterial_TC_1"
                    
          readExcelDataIntoProjectVariable(Excel_Path.ExcelPath_TestDataSheet,"SELECT * FROM ["+Mod_Name+"$] WHERE Testcase_ID = '"+TestCase_ID+"'","TC_TestData");
          //var TC_ID = Project.Variables.sampleVariable   ///Start from here..how to retrieve  from this sample variable table
          var i
          for (i=0;i<= Project.Variables.TC_TestData.RowCount-1;i++){                          
                      
          var TC_ID=Project.Variables.TC_TestData.Item(Data_Hashtable.TestcaseID,i)
          Log.Message(TC_ID)                                      
          var InData =  Project.Variables.TC_TestData.Item(Data_Hashtable.InputData,i)
          Log.Message(InData)      
          var LOC = Project.Variables.TC_TestData.Item(Data_Hashtable.Location,i)
          Log.Message(LOC)
              
          try{ 
                //Check Location
                Location(LOC)
                
                //Click on On Premise tab
                
                //Click on the Search icon
                
                
                //Enter the Account number to search by in the text field
                
                //Delay Execution
                
                //Click on Account name to navigate to Account Details screen
                
                //Delay Execution
                
                //Click on Objectives tab
                
                //Delay Execution
                
                //Click on the Show Sales Materials dropdown
                
                //Delay Execution
                
                //Verify that the Sales Materials documents are displayed
                
                //Checkpoint
                
                //Click on Sales Material document
                
                //Delay Execution
                
                //Verify that the Sales Materials document is opened
                
                //Checkpoint
                
                //Click on Back button to return to the Objectives tab
                
                //Click on Back button to return to the Account List screen
                
                //Delay Execution
                
                //Click on Search icon
                
                //Click on Cross button to clear the search criteria
                
                //Click on Back button to return to the base
                     
                  
            }
         catch (ex) {
              Log.Error("Error while Executing testcase");
            }
                    
           }/// end for loop
}//end function
                    
                    
              
                    
                
                                       
                         
                      

 


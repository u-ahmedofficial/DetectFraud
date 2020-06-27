import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import sys

#######################################
# Data Cleaning Part
df1=pd.read_csv('ULoan_Tarin',index_col=False)
df1=df1.drop('Unnamed: 0',axis=1)
# In[93]:
df2=pd.read_csv('ULoan_Tarin')
df2=df2.drop('Unnamed: 0',axis=1)
# In[117]:
df=pd.concat([df1,df2],axis=0)
# In[131]:
def showData():
	print(df.head(5))
##########################################
# Model Training Part
# Regression Algorithm is used
from sklearn.model_selection import train_test_split
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
try:
	X=df.drop('Loan_Status',axis=1)
	y=df['Loan_Status']
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

	lg=LogisticRegression()
	lg.fit(X_train,y_train)
except:
	pass
#################################

def pred(row_num,DataFram): 
	'''
	Arguments:
	---------------------------------
	row_num: int
		Record number which needs to be checked fraud
	datafram: DataFrame
		DataFrame from which the record is to be taken

	Description:
		Function Takes DataFrame and based on the record number predicts the fraud
	'''
	
	#print(X_test.loc[row_num])
	#print(DataFram.loc[row_num])
	#pred=lg.predict(X_test)[row_num]
	try:
		pred=lg.predict(DataFram)[row_num]
	except:
		pass
	# print("Predictions says: " + str(pred))
	return str(pred)

def stats(DataFram):
	print(DataFram.describe())


def main():
	'''
	Starting Point of the program
	'''
	df3=pd.read_csv('ULoan_Test',index_col=False)
	lol=df3

	count=list()
	for i in range(0,len(lol),1):
		x = pred(i,lol)
		count.append(x)
	
	indices = [i for i, x in enumerate(count) if x == "0"]
	dfObj = pd.DataFrame(columns=['Gender','Married','Dependents','Education','Self_Employed','ApplicantIncome','CoapplicantIncome','LoanAmount','Loan_Amount_Term','Credit_History','Property_Area'])
	for i in indices:
		dfObj=dfObj.append({'Gender':lol.loc[i]['Gender'],'Married':lol.loc[i]['Married'],'Dependents':lol.loc[i]['Dependents'],'Education':lol.loc[i]['Education'],'Self_Employed':lol.loc[i]['Self_Employed'],'ApplicantIncome':lol.loc[i]['ApplicantIncome'],'CoapplicantIncome':lol.loc[i]['CoapplicantIncome'],'LoanAmount':lol.loc[i]['LoanAmount'],'Loan_Amount_Term':lol.loc[i]['Loan_Amount_Term'],'Credit_History':lol.loc[i]['Credit_History'],'Property_Area':lol.loc[i]['Property_Area']},ignore_index=True)

	dfObj.to_csv('fraud',index=False)
	
if __name__ == '__main__':
	main()
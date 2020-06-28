import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import sys
import json
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

def plotFraud(dfObj):
	plt.style.use('fivethirtyeight')
	test = pd.read_csv('ULoan_Test',index_col=False)
	per = round((len(dfObj) / len(test)) * 100,2)

	fig = plt.figure()
	ax = fig.add_axes([0,0,1,1])
	ax.axis('equal')
	langs = ['Fraud','No Fraud']
	students = [per,100-per]
	ax.pie(students, labels = langs,autopct='%1.2f%%')
	# plt.show()
	plt.savefig('foo.png')

def plotGraduate(fraud):
	sns_plot = sns.countplot(x = fraud['Gender'], hue = fraud['Education'])
	sns_plot.figure.savefig("output.png")
	
def saveJSON(person_dict):
	with open('data.txt', 'w') as json_file:
		json.dump(person_dict, json_file)

def main():
	'''
	Starting Point of the program
	'''
	df3=pd.read_csv('ULoan_Test',index_col=False)
	Payments=df3

	count=list()
	for i in range(0,len(Payments),1):
		x = pred(i,Payments)
		count.append(x)
	
	indices = [i for i, x in enumerate(count) if x == "0"]
	dfObj = pd.DataFrame(columns=['Gender','Married','Dependents','Education','Self_Employed','ApplicantIncome','CoapplicantIncome','LoanAmount','Loan_Amount_Term','Credit_History','Property_Area'])
	for i in indices:
		dfObj=dfObj.append({'Gender':Payments.loc[i]['Gender'],'Married':Payments.loc[i]['Married'],'Dependents':Payments.loc[i]['Dependents'],'Education':Payments.loc[i]['Education'],'Self_Employed':Payments.loc[i]['Self_Employed'],'ApplicantIncome':Payments.loc[i]['ApplicantIncome'],'CoapplicantIncome':Payments.loc[i]['CoapplicantIncome'],'LoanAmount':Payments.loc[i]['LoanAmount'],'Loan_Amount_Term':Payments.loc[i]['Loan_Amount_Term'],'Credit_History':Payments.loc[i]['Credit_History'],'Property_Area':Payments.loc[i]['Property_Area']},ignore_index=True)

	dfObj.to_csv('fraud',index=False)
	malePercent=round((Payments[Payments['Gender']==1].count()[0] / len(Payments)) * 100,2)
	femalePercent=round((Payments[Payments['Gender']==0].count()[0] / len(Payments)) * 100,2)
	marriedPercent=round((Payments[Payments['Married']==1].count()[0] / len(Payments)) * 100,2)
	unmarriedPercent=round((Payments[Payments['Married']==0].count()[0] / len(Payments)) * 100,2)
	#plotFraud(dfObj)
	person_dict={'malePercent':malePercent,'femalePercent':femalePercent,'marriedPercent':marriedPercent,'unmarriedPercent':unmarriedPercent}
	#plotGraduate(dfObj)
	saveJSON(person_dict)
	
if __name__ == '__main__':
	main()

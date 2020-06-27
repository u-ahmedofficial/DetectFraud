
# coding: utf-8

# In[67]:


import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import sys
#%metplotlib inline
# In[92]:
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

# In[118]:


from sklearn.model_selection import train_test_split
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
X=df.drop('Loan_Status',axis=1)
y=df['Loan_Status']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
lg=LogisticRegression()
lg.fit(X_train,y_train)
# In[146]:
def pred(row_num): 
    #print(X_test.loc[row_num])
    print(lol.loc[row_num])
    #pred=lg.predict(X_test)[row_num]
    pred=lg.predict(lol)[row_num]
    print("Predictions says: " + str(pred))


# In[147]:

df3=pd.read_csv('ULoan_Test',index_col=False)
#df3=df3.drop('Unnamed: 0',axis=1)
lol=df3

def stats():
    print(lol.describe())


stats()
#lol.to_csv('umair',index=False)
#print(type(sys.argv[1]))
#pred(int(sys.argv[1]))
#print(X_test.loc[95])
#for x in range(1,25,1):
   # pred(x)


# In[121]:





# In[ ]:





# In[122]:





# In[123]:





# In[124]:



("")


# In[106]:





# In[ ]:





# In[127]:





# In[ ]:





# In[ ]:





# In[ ]:





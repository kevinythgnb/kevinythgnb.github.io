import statistics as stat
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as tck
import matplotlib.gridspec as gridspec

# Access uploaded Excel spreadsheet and split data into separate columns
# csTimer csv export must have info column renamed to "No_Time_Scramble"
# timesheet = pd.read_excel(r'C:\Users\nivek\Downloads\cstimer4x4.xlsx')
# timesheet[['SolveNo_Time', 'Scramble']] = timesheet['No_Time_Scramble'].str.split(";;", expand = True)
# timesheet[['SolveNo', 'Time']] = timesheet['SolveNo_Time'].str.split(";", expand = True)
# timesheet[['Scramble', 'ObjectDate', 'TimeRepeat']] = timesheet['Scramble'].str.split(";", expand = True)

# Access uploaded csv file and split data into separate columns
timesheet = pd.read_csv(r"C:\Users\nivek\Documents\Scripts\csTimerExport_20230204_090855.csv")
timesheet[['SolveNo_Time', 'Scramble_ObjectDate_TimeRepeat']] = timesheet[
    'No.;Time;Comment;Scramble;Date;P.1'].str.split(";;", expand=True)
timesheet[['SolveNo', 'Time']] = timesheet['SolveNo_Time'].str.split(";", expand=True)
timesheet[['Scramble', 'ObjectDate', 'TimeRepeat']] = timesheet['Scramble_ObjectDate_TimeRepeat'].str.split(";",
                                                                                                            expand=True)

# Convert solve number from object format to integer format
timesheet['SolveNo'] = timesheet['SolveNo'].astype(int)

# Convert datetime from object format to datetime format, then again to epoch format (elapsed seconds since start of 2018)
timesheet['Date'] = pd.to_datetime(timesheet['ObjectDate'], errors='coerce')
timesheet['Epoch2018'] = (timesheet['Date'] - pd.Timestamp('2018-01-01')) // pd.Timedelta('1s')

# Convert time from object format to float format
# mins = timesheet['Time'].str.split(":").str[0]
# secs = timesheet['Time'].str.split(":").str[1]
# timesheet['SecondsTime'] = mins.astype(float) * 60 + secs.astype(float)

# Accommodate times under 1 minute, i.e. no colon
for x in range(len(timesheet)):
    if ':' in timesheet.loc[x, 'Time']:
        SplitTime = timesheet.loc[x, 'Time'].split(':')
        timesheet.loc[x, 'SecondsTime'] = float(SplitTime[0]) * 60 + float(SplitTime[1])
    else:
        timesheet.loc[x, 'SecondsTime'] = float(timesheet.loc[x, 'Time'])

# Restore ao12 calculations
timesheet['ao12'] = timesheet['SecondsTime'].rolling(12).mean()

# Arrange spreadsheet columns
timesheet = timesheet[['SolveNo', 'Date', 'Epoch2018', 'Time', 'SecondsTime', 'ao12', 'Scramble']]

# Format spreadsheet appearance
# timesheet.set_index('SolveNo', inplace = True)
pd.set_option('display.colheader_justify', 'left')
pd.set_option('display.width', 1000)
pd.set_option('display.max_columns', None)
pd.set_option('display.max_colwidth', None)
pd.set_option('display.min_rows', 40)
pd.set_option('display.max_rows', 40)

print(timesheet)
print()
print(timesheet.dtypes)
print()
print('Session Mean = ' + str(stat.mean(timesheet['SecondsTime'])))
print()
print('Session Best = ' + str(pd.Series.min(timesheet['SecondsTime'])))
print(timesheet.loc[timesheet['SecondsTime'] == pd.Series.min(timesheet['SecondsTime'])])
print('Session Q1 = ' + str(timesheet['SecondsTime'].quantile(0.25)))
print('Session Median = ' + str(stat.median(timesheet['SecondsTime'])))
print('Session Q3 = ' + str(timesheet['SecondsTime'].quantile(0.75)))
print('Session Worst = ' + str(pd.Series.max(timesheet['SecondsTime'])))
print(timesheet.loc[timesheet['SecondsTime'] == pd.Series.max(timesheet['SecondsTime'])])
print()

fig = plt.figure(1, figsize=(30, 15))
gs = gridspec.GridSpec(2, 2, width_ratios=[1, 7], height_ratios=[1, 1], wspace=0.1, hspace=0.25)

ax1 = plt.subplot(gs[:, 0])
ax1.violinplot(timesheet['SecondsTime'], vert=True)
ax1.boxplot(timesheet['SecondsTime'], showmeans=True)
ax1.set_title('Time Quartiles')
ax1.set_xlabel('Distribution')
ax1.set_xticklabels(['4x4'])
ax1.set_ylabel('Time in Seconds')
ax1.yaxis.set_minor_locator(tck.MultipleLocator(1))
ax1.grid(which='both', axis='y')

ax2 = plt.subplot(gs[0, 1])
ax2.plot(timesheet['SolveNo'], timesheet['SecondsTime'], label='Time')
ax2.plot(timesheet['SolveNo'], timesheet['ao12'], color='r', label='ao12')
ax2.set_title('Time Trend')
ax2.legend(loc='upper right')
ax2.set_xlabel('Solve Number')
ax2.set_xlim(0)
ax2.set_xticks(np.arange(0, 2900, 100))
ax2.xaxis.set_minor_locator(tck.MultipleLocator(20))
ax2.set_ylabel('Time in Seconds')
ax2.set_ylim(30)
ax2.set_yticks(np.arange(30, 80, 5))
ax2.yaxis.set_minor_locator(tck.MultipleLocator(1))
ax2.grid(axis='y')

ax3 = plt.subplot(gs[1, 1])
ax3.plot(timesheet['Epoch2018'], timesheet['SecondsTime'])
ax3.set_title('Time Trend by Datetime')
ax3.set_xlabel('Datetime')
ax3.set_xlim(20000000)
ax3.set_xticks(np.arange(20000000, 170000000, 10000000))
ax3.set_xticklabels(pd.to_datetime(np.arange(20000000, 170000000, 10000000), unit='s', origin='2018-01-01'),
                    rotation=20)
ax3.xaxis.set_minor_locator(tck.MultipleLocator(5000000))
ax3.set_ylabel('Time in Seconds')
ax3.set_ylim(30)
ax3.set_yticks(np.arange(30, 80, 5))
ax3.yaxis.set_minor_locator(tck.MultipleLocator(1))
ax3.grid(axis='y')

plt.show()

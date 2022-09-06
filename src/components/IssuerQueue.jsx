import React, { useState, useEffect } from 'react';
import { httpClient } from '../http/http-client';

const IssuerQueue = () => {
  const [applications, setApplications] = useState([]);
  const [statistics, setStatistics] = useState({
    totalIssued: 0,
    totalPendingIssuance: 0,
  });

  useEffect(async () => {
    try {
      console.log('making the call');
      const response = await httpClient.get('applications/get-issuer-queue');
      setApplications(response.data);
    } catch (e) {
      console.log('Cannot get data...', e);
    }
  }, []);

  useEffect(async () => {
    try {
      const stats = await httpClient.get('applications/get-issuer-statistics');
      setStatistics(stats.data);
    } catch (e) {
      console.log('Cannot get data...');
    }
  }, []);

  useEffect(() => {
    console.log('Applications', applications);
  }, [applications]);

  return (
    <>
      <h3>List of Applications Pending to Issued:</h3>
      {applications?.map((u) => {
        return (
          <div className='card my-4' key={u.customerId}>
            <div className='card-body d-flex'>
              <div className='ms-4'>
                <h4>
                  {'Full Name :'} {u.fullName}
                </h4>
                <h4>
                  {'Date of Application :'} {u.dateOfApplication}
                </h4>
                <h4>
                  {'Annual Income :'} {u.annualIncome}
                </h4>
                <h4>
                  {'Employment Status :'} {u.employmentStatus}
                </h4>
                <h4>
                  {'Credit Card Id :'} {u.creditCardId}
                </h4>
                <h4>
                  {'CardCode :'} {u.cardCode}
                </h4>
                <h4>
                  {'Limit Required :'} {u.limitRequired}
                </h4>
                <h4>
                  {'Card Description :'} {u.cardDescription}
                </h4>
                <h4>
                  {'Status:'} {u.status}
                </h4>
              </div>
            </div>
            <button className='btn btn-primary'>See Details</button>
          </div>
        );
      })}
      <h4>
        {'Total Issued :'} {statistics.totalIssued}
      </h4>
      <h4>
        {'Total Pending Issuance :'} {statistics.totalPendingIssuance}
      </h4>
    </>
  );
};

export default IssuerQueue;

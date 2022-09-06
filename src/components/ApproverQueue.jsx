import React,{useState} from 'react'
import { httpClient } from '../http/http-client'

export default function ApproverQueue() {

    const [approverQueue, setApproverQueue] = useState([])

    const getApproverQueue = () => {
        httpClient.get("applications/get-approver-queue").then(response => {
            console.log(response.data)
            setApproverQueue(response.data);
        });
    }
    getApproverQueue();
        return (
          <>
            <div>
              <h3>Approver Queue</h3>
              <p>{approverQueue}</p>
            </div>
          </>
        );
    }


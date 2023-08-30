"use client"
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Table from '../components/table';

export default function AdminPanel(){
  
    return(
        <div>
            <Head>
                <title>View Writing Prompts</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className = "container">
                 <Table/>
            </div>
        </div>        
    )
}
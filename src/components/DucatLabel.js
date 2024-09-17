'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import TrackItemButton from '@/components/TrackItemButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import useObtainedExtras from '@/hooks/useObtainedExtras';
import useGlobalMode from '@/hooks/useGlobalMode';

export default function DucatLabel({ rawObj, className, style }){
    const router = useRouter();

    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    const [ globalMode, setGlobalMode ] = useGlobalMode();

    if(rawObj == null || globalMode !== "ducatMode") return null;

    const ducatValue = com.getDucatValue(rawObj);

    const extrasForObject = com.getUserDataExtrasObtained(rawObj.id);
    const extrasObtainedValue = extrasForObject*ducatValue;

    // console.log(`got value!`,ducatValue);

    return (
        <>
            {
                ducatValue <= 0 ? null:
                <div className={`sized-content obtained-extra-component h-flex flex-center${className ?? ``}`} style={com.shallowMerge({}, style)}>
                    <img style={{ width: '20px', height: '20px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/Orokin Ducats.png`}/>
                    <span className='sized-content h-flex' style={{ marginBottom: '2px', whiteSpace: 'pre' }}>
                        { `${ducatValue}` }
                        { extrasObtainedValue <= 0 ? null: (<div className='sized-content h-flex'>{` (`}<span>{ `${extrasObtainedValue}` }</span>{`)`}</div>) }
                    </span>
                </div>
            }
        </>
    );
}
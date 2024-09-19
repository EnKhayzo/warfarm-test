'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import ItemActionButton from '@/components/ItemActionButton.js';

import * as com from "@/app/common.js"
import useObtainedComponents from '@/hooks/useObtainedComponents';
import ObjectStateLabel from './ObjectStateLabel';
import useObtainedExtras from '@/hooks/useObtainedExtras';
import LabelCheckbox from './LabelCheckbox';

export default function ObtainedLabelButtonExtras({ component, isRawObj=false, width=null, showLabel=true }){
    const router = useRouter();

    const [ obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    
    const rawComponent = (isRawObj ? component : component.rawObj);
    const componentIsAnomalous = rawComponent.required <= 0;

    const isFarmed = com.objectIsFarmed(rawComponent);
    const isCrafted = com.getUserDataExtrasCrafted(rawComponent.id);

    return (
            !isCrafted ?
                <div 
                    className='sized-content h-flex flex-center'
                    style={{
                        backgroundColor: 'var(--color-secondary)',
                        borderRadius: '5px',
                        padding: '5px',
                        paddingLeft: '10px',
                        paddingRight: '10px'
                    }}
                >
                    <LabelCheckbox 
                        textLabel={`Crafted?`}
                        onClick={ev => { ev.preventDefault(); ev.stopPropagation(); }}
                        onChange={ev => {
                            ev.preventDefault();
                            ev.stopPropagation();
                            com.setUserDataExtrasCrafted(rawComponent.id, ev.target.checked);
                        }}
                    />
                </div>
            :
                <div className='sized-content v-flex' style={{ alignSelf: 'stretch', gap: '5px', width: width ?? 'auto' }}>
                    {
                        componentIsAnomalous ? null:
                        <div className='sized-content h-flex flex-center' style={{ gap: '5px' }}>
                            <button 
                                className='sized-content h-flex object-page-component-owned-button flex-center'
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                    com.incrementUserDataExtrasObtained(rawComponent.id);
                                }}
                            >
                                +
                            </button>
                            { !showLabel ? null: <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${com.getUserDataExtrasObtained(rawComponent.id)} duplicates`}</div> }
                            <button 
                                className='sized-content h-flex object-page-component-owned-button flex-center'
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    ev.stopPropagation();

                                    const extrasObtained = com.getUserDataExtrasObtained(rawComponent.id);
                                    if(extrasObtained <= 0) com.setUserDataExtrasCrafted(rawComponent.id, false);
                                    else com.decrementUserDataExtrasObtained(rawComponent.id);
                                }}
                            >
                                -
                            </button>
                        </div>
                    }
                </div>
    );
}
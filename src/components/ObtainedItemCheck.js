'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useObtainedComponents from '@/hooks/useObtainedComponents.js';

import * as com from "@/app/common.js"

export default function ObtainedItemCheck({ positionAbsolute=true, hollowAbsolute=true, itemId, showPartial=true, obtainedComponents=null }){
    const [ _obtainedComponents, setObtainedComponents ] = useObtainedComponents();
    
    const obj = com.getObjectFromId(itemId);
    if(obj == null) return null;
    if(obj.category === "missions") return (null);

    const isObtainedPerc = showPartial ? com.objectIsFarmedPerc(obj, _obtainedComponents) : (com.objectIsFarmed(obj, _obtainedComponents) ? 1 : 0);
    return (
            <div 
                className={`sized-content h-flex obtained-check${ positionAbsolute ? ' absolute' : '' } v-flex flex-center${ isObtainedPerc <= 0 ? ` obtained-item-check-container-unfarmed` : ``}`}
                style={{ 
                    position: positionAbsolute ? 'absolute' : 'relative' ,
                    width: '20px',
                    height: '20px'
                }}
            >
                <div 
                    className={`sized-content h-flex flex-center`} 
                    style={{ 
                        position: 'relative',
                        width: '20px',
                        height: '20px'
                    }}
                >
                    {
                        showPartial && isObtainedPerc > 0 && isObtainedPerc < 1 ?
                        <div style={{ 
                            position: 'absolute', 
                            bottom: '0px', 
                            right: '0px', 
                            backgroundColor: '#145d7996',
                            borderRadius: '5px',
                            borderTopLeftRadius: '0px',
                            borderTopRightRadius: '0px',
                            width: '20px',
                            height: `${isObtainedPerc*20}px`,
                            opacity: '50%',
                            pointerEvents: 'none'
                        }}>

                        </div>
                        :null
                    }
                    <img 
                        title={`Item is${isObtainedPerc <= 0 ? ` not` : isObtainedPerc < 1 ? ` partially` : ``} farmed`}
                        src={isObtainedPerc < 1 ? `${com.getBaseEnvPath().basePath}/icons/success_hollow.svg` : `${com.getBaseEnvPath().basePath}/icons/success.svg`} 
                        className={`sized-content icon-default-filter flex-center obtained-check-hollow`}
                        onClick={(ev) => { 
                            ev.preventDefault(); 
                            ev.stopPropagation(); 

                            com.setObjectToFarmed(
                                com.getObjectFromId(itemId), 
                                !com.objectIsFarmed(com.getObjectFromId(itemId))
                            );
                        }}
                        style={{
                            opacity: isObtainedPerc < 1 ? '100%' : '0%',
                            position: 'absolute',
                            top: hollowAbsolute ? '0px' : 'inherit', 
                            right: hollowAbsolute ? '0px' : 'inherit', 
                            width: '20px',
                            height: '20px'
                        }}
                    />
                    {
                        isObtainedPerc <= 0 ? null:
                        <img 
                            src={
                                isObtainedPerc <= 0 ? 
                                    `${com.getBaseEnvPath().basePath}/icons/success_hollow.svg` 
                                : isObtainedPerc < 1 ? 
                                    `${com.getBaseEnvPath().basePath}/icons/square.svg` 
                                :   `${com.getBaseEnvPath().basePath}/icons/success.svg`
                            } 
                            className={`sized-content obtained-check-icon${ isObtainedPerc < 1 ? ` icon-partial-filter` : `` } flex-center${ isObtainedPerc <= 0 ? ` obtained-check-hollow` : ``}`}
                            style={{
                                opacity: '50%',
                                pointerEvents: 'none'
                            }}
                        />
                    }
                </div>
            </div>
    );
}
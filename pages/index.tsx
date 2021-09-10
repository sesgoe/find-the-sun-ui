import Head from 'next/head';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useHome } from '../hooks/useHome';

export default function Home() {
    const {
        error,
        reset,
        errorText,
        showMap,
        debouncedSearch,
        searchResults,
        buildMapData,
        hasNavigator,
        setEnabled,
        closestCity,
    } = useHome();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Find The Sun</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center flex-1 w-full px-10 space-y-4 text-center">
                {error ? (
                    <div>
                        <h1 className="w-full mb-4 text-6xl font-extrabold text-red-500 uppercase">
                            Sorry!
                        </h1>
                        <h2 className="text-base text-gray-900">{errorText}</h2>
                        <button
                            className="p-4 my-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-400"
                            onClick={() => reset()}
                        >
                            Pick another location
                        </button>
                    </div>
                ) : !showMap ? (
                    <>
                        <h1 className="w-full mb-4 text-6xl font-extrabold uppercase">
                            Find The Sun
                        </h1>
                        <h2 className="text-sm text-gray-600">
                            Feeling down and need some Vitamin D? Enter your address below or click
                            the "Use Current Location" button to find the nearest sunshine-soaked
                            city near you!
                        </h2>
                        <div className="relative w-1/3">
                            <p className="pb-2">Street Address</p>
                            <input
                                type="text"
                                className="w-full rounded-md"
                                onChange={debouncedSearch}
                            ></input>
                            <Menu>
                                {searchResults?.length > 0 && (
                                    <Transition
                                        show={searchResults.length > 0}
                                        as={Fragment}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Menu.Items
                                            static
                                            className="absolute left-0 flex flex-col w-full top-[5rem]"
                                        >
                                            {searchResults.map((searchResult) => (
                                                <Menu.Item key={searchResult.id}>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${
                                                                active
                                                                    ? 'bg-blue-400'
                                                                    : 'bg-blue-100'
                                                            } p-2`}
                                                            onClick={() =>
                                                                buildMapData(
                                                                    searchResult.center[1],
                                                                    searchResult.center[0]
                                                                )
                                                            }
                                                        >
                                                            {searchResult.place_name}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                )}
                            </Menu>
                        </div>
                        {hasNavigator && (
                            <div className="space-y-4">
                                <p>or</p>
                                <button
                                    className="p-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-400"
                                    onClick={() => setEnabled(true)}
                                >
                                    Use Current Location
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <img src={closestCity.imageUrl} />
                        <p>
                            It's currently sunny in <b>{closestCity.data.name}!</b>
                        </p>
                        <p>
                            If you could fly like a bird, it's about{' '}
                            {Math.round(closestCity.data.distance)} miles away!
                        </p>
                        <button
                            className="p-4 my-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-400"
                            onClick={() => reset()}
                        >
                            Pick another location
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

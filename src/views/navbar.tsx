/* eslint-disable jsx-a11y/anchor-is-valid */
import { UnstyledButton, Tooltip, Title, rem, AppShell } from '@mantine/core'
import { IconHome2, IconSettings, IconLogout, IconTrophy, IconHelp } from '@tabler/icons-react'
import { MantineLogo } from '@mantinex/mantine-logo'
import * as Engine from '@modules/Engine'
import { Props } from '@schemas/props'

/**
 * Pages
 */
import Dashboard from './pages/dashboard'

export function Navbar({ state, dispatch }: Props) {
    const navigation = [
        {
            label: 'Home',
            icon: IconHome2,
            subtabs: [
                {
                    label: 'Dashboard',
                    view: <Dashboard state={state} dispatch={dispatch} />,
                },
                {
                    label: 'Dashboard 2',
                    view: <Dashboard state={state} dispatch={dispatch} />,
                },
            ],
        },
    ]

    const navigationBottom = [
        {
            label: 'Achievements',
            icon: IconTrophy,
            subtabs: [
                {
                    label: 'Progression',
                    view: <Dashboard state={state} dispatch={dispatch} />,
                },
                {
                    label: 'Resources',
                    view: <Dashboard state={state} dispatch={dispatch} />,
                },
                {
                    label: 'Time-Based',
                    view: <Dashboard state={state} dispatch={dispatch} />,
                },
                {
                    label: 'Challenges',
                    view: <Dashboard state={state} dispatch={dispatch} />,
                },
                {
                    label: 'Hidden',
                    view: <Dashboard state={state} dispatch={dispatch} />,
                },
            ],
        },
        {
            label: 'Help',
            icon: IconHelp,
            subtabs: [
                {
                    label: 'Getting Started',
                    view: <></>,
                },
            ],
        },
        {
            label: 'Settings',
            icon: IconSettings,
            subtabs: [
                {
                    label: 'Main',
                    view: <></>,
                },
                {
                    label: 'Interface',
                    view: <></>,
                },
                {
                    label: 'Audio',
                    view: <></>,
                },
                {
                    label: 'Preferences',
                    view: <></>,
                },
            ],
        },
    ]

    const selectedSubTabs = navigation.find((nav) => nav.label === state.tab)?.subtabs || navigationBottom.find((nav) => nav.label === state.tab)?.subtabs
    const mainLinks = navigation.map((link) => (
        <Tooltip label={link.label} position="right" withArrow transitionProps={{ duration: 0 }} key={link.label}>
            <UnstyledButton
                onClick={() => {
                    Engine.Dispatch.tab(dispatch, link.label)
                    const subtabLabel = navigation.find((nav) => nav.label === link.label)?.subtabs[0].label
                    if (subtabLabel) {
                        Engine.Dispatch.subtab(dispatch, subtabLabel)
                    }
                }}
                className={'mainLink'}
                data-active={link.label === state.tab || undefined}
            >
                <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    ))

    const links = selectedSubTabs ? (
        selectedSubTabs.map((link) => (
            <a
                className={'link'}
                data-active={state.subtab === link.label || undefined}
                onClick={(event) => {
                    event.preventDefault()
                    Engine.Dispatch.subtab(dispatch, link.label)
                }}
                key={link.label}
            >
                {link.label}
            </a>
        ))
    ) : (
        <></>
    )

    return (
        <>
            <AppShell
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                }}
                padding="md"
            >
                <AppShell.Navbar>
                    <nav className={'navbar'} style={{ width: '300px' }}>
                        <div className={'wrapper'}>
                            <div className={'aside'}>
                                <div className={'logo'}>
                                    <MantineLogo type="mark" size={30} />
                                </div>
                                <div style={{ flex: 1 }}>{mainLinks}</div>
                                {navigationBottom.map((link) => (
                                    <Tooltip label={link.label} position="right" withArrow transitionProps={{ duration: 0 }} key={link.label}>
                                        <UnstyledButton
                                            onClick={() => {
                                                Engine.Dispatch.tab(dispatch, link.label)
                                                const subtabLabel = navigationBottom.find((nav) => nav.label === link.label)?.subtabs[0].label
                                                if (subtabLabel) {
                                                    Engine.Dispatch.subtab(dispatch, subtabLabel)
                                                }
                                            }}
                                            className={'mainLink'}
                                            data-active={link.label === state.tab || undefined}
                                        >
                                            <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
                                        </UnstyledButton>
                                    </Tooltip>
                                ))}
                                <Tooltip label="Quit" position="right" withArrow transitionProps={{ duration: 0 }} key={'Quit'}>
                                    <UnstyledButton
                                        onClick={() => {
                                            window.api.quit()
                                        }}
                                        className={'mainLink'}
                                        style={{ marginBottom: '8px' }}
                                    >
                                        <IconLogout style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
                                    </UnstyledButton>
                                </Tooltip>
                            </div>
                            <div className={'main'}>
                                <Title order={4} className={'title'}>
                                    {state.tab}
                                </Title>
                                {links}
                            </div>
                        </div>
                    </nav>
                </AppShell.Navbar>

                <AppShell.Main>
                    <Title order={1} ta={'center'}>
                        {state.subtab}
                    </Title>
                    {selectedSubTabs?.find((subtab) => subtab.label === state.subtab)?.view}
                </AppShell.Main>
            </AppShell>
        </>
    )
}

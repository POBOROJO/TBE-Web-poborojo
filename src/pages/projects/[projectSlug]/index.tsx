import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionLinkItem,
  FlexContainer,
  MDXRenderer,
  ProjectHeroContainer,
  SEO,
  Section,
  Text,
  ProgressBar,
  Button,
} from '@/components';
import { ProjectPageProps } from '@/interfaces';
import { getProjectPageProps, getSelectedProjectChapterMeta } from '@/utils';
import { useApi, useUser } from '@/hooks';
import { routes } from '@/constant';

const ProjectPage = ({ project, meta, seoMeta, slug }: ProjectPageProps) => {
  const [projectMeta, setProjectMeta] = useState<string>(meta);
  const [sections, setSections] = useState(project.sections);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [isChapterCompleted, setIsChapterCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalChapters = sections.reduce((acc, section) => acc + section.chapters.length, 0);
  const completedChapters = sections.reduce(
    (acc, section) => acc + section.chapters.filter((chapter) => chapter.isCompleted).length,
    0
  );

  useEffect(() => {
    if (currentChapterId) {
      const chapter = sections
        .flatMap((section) => section.chapters)
        .find((ch) => ch.chapterId === currentChapterId);
      setIsChapterCompleted(chapter?.isCompleted ?? false);
    }
  }, [currentChapterId, sections]);

  const handleChapterClick = ({ sectionId, chapterId }: any) => {
    const selectedChapter = getSelectedProjectChapterMeta(
      project,
      sectionId,
      chapterId
    );

    setProjectMeta(selectedChapter);
  };

  return (
    <React.Fragment>
      <SEO seoMeta={seoMeta} />
      <Section className='md:p-2 p-2'>
        <ProjectHeroContainer
          name={project.name}
          roadmap={project.roadmap}
          difficultyLevel={project.difficultyLevel}
        />
      </Section>
      <Section className='md:p-2 p-2'>
        <FlexContainer className='w-full gap-4' itemCenter={false}>
          <FlexContainer
            className='border md:w-3/12 w-full p-2 gap-1 rounded self-baseline'
            itemCenter={false}
            direction='col'
          >
            <Text level='h5' className='heading-5'>
              Sections
            </Text>
            <FlexContainer justifyCenter={false} className='gap-px'>
              {project.sections.map(({ sectionId, sectionName, chapters }) => {
                return (
                  <Accordion title={sectionName} key={sectionId}>
                    {chapters.map(({ chapterId, chapterName }) => {
                      return (
                        <AccordionLinkItem
                          key={chapterId}
                          label={chapterName}
                          href={`${slug}?projectId=${project._id}&sectionId=${sectionId}&chapterId=${chapterId}`}
                          onClick={() =>
                            handleChapterClick({ sectionId, chapterId })
                          }
                        />
                      );
                    })}
                  </Accordion>
                );
              })}
            </FlexContainer>
          </FlexContainer>
          <FlexContainer
            className='border md:w-8/12 w-full p-2 rounded'
            justifyCenter={false}
            itemCenter={false}
          >
            <MDXRenderer mdxSource={projectMeta} />
          </FlexContainer>
        </FlexContainer>
      </Section>
    </React.Fragment>
  );
};

export const getServerSideProps = getProjectPageProps;

export default ProjectPage;

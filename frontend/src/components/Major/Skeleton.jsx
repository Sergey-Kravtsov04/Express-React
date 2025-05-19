import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import styles from "./Major.module.scss";

export const MajorSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonInfo}>
            <Skeleton variant="text" width="80%" height={45} />
          </div>
        </div>
      </Stack>
    </div>
  );
};
